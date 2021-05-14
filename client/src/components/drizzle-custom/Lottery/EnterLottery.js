import React from "react";
import toast from "react-hot-toast";

const successToast = (transactions, txHash) => toast.success(<div><div>Transaction status: `{transactions[txHash].status}`</div><div>`{txHash}`</div></div>);
const failToast = (transactions, txHash) => toast.fail(<div><div>Transaction status: `{transactions[txHash].status}`</div><div>`{txHash}`</div></div>);
const loadingToast = (transactions, txHash) => toast.loading(<div><div>Transaction status: `{transactions[txHash].status}`</div><div>`{txHash}`</div></div>);


class EnterLottery extends React.Component {
    state = { stackId: null, transactionStatus: null, loadingToastId: null };

    setValue = () => {
        const { drizzle, drizzleState } = this.props;
        const contract = drizzle.contracts.Lottery;
        const stackId = contract.methods.enterLottery.cacheSend(drizzle.web3.utils.asciiToHex("16324546474849"), { from: drizzleState.accounts[0], gas: drizzle.web3.utils.toBN("1000000") });
        this.setState({ stackId, transactionStatus: null });
    };

    getTxStatus = () => {
        const { transactions, transactionStack } = this.props.drizzleState;
        const txHash = transactionStack[this.state.stackId];
        if (!txHash) return null;
        var status = transactions[txHash] && transactions[txHash].status;
        switch(status){
            case 'success':
                if(this.state.loadingToastId){
                    toast.dismiss(this.state.loadingToastId);
                    this.setState({loadingToastId: null});
                }
                this.setState({transactionStatus: 'success'});
                successToast(transactions, txHash);
                this.props.callback();
                break;
            case 'pending':
                if(!this.state.loadingToastId){
                    const toastId = loadingToast(transactions, txHash);
                    this.setState({loadingToastId: toastId});
                }
                break;
            default:
                break;
        }
    };

    render() {
        return (
            <div>
                <button className="btn btn-success" onClick={this.setValue}>Enter Lottery</button>
                {!this.state.transactionStatus && this.getTxStatus()}
            </div>
        );
    }
}

export default EnterLottery;