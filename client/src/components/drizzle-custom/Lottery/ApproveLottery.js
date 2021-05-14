import React from "react";
import styles from "./ApproveLottery.module.css";
import toast from "react-hot-toast";

const successToast = (transactions, txHash) => toast.success(<div><div>Transaction status: `{transactions[txHash].status}`</div><div>`{txHash}`</div></div>);
const failToast = (transactions, txHash) => toast.fail(<div><div>Transaction status: `{transactions[txHash].status}`</div><div>`{txHash}`</div></div>);
const loadingToast = (transactions, txHash) => toast.loading(<div><div>Transaction status: `{transactions[txHash].status}`</div><div>`{txHash}`</div></div>);

class ApproveLottery extends React.Component {
    state = { stackId: null, dataKey: null, transactionStatus: "pending", loadingToastId: null };
    ticketPrice = "100";

    componentDidMount() {
        this.getApprovedLotteryValue();
    }

    setValue = () => {
        const { drizzle, drizzleState } = this.props;
        const contract = drizzle.contracts.MaiaToken;
        const stackId = contract.methods.approve.cacheSend(drizzle.contracts.Lottery.address, drizzle.web3.utils.toBN(this.ticketPrice), { from: drizzleState.accounts[0], gas: drizzle.web3.utils.toBN("1000000") });
        this.setState({ stackId, transactionStatus: null });
    };

    getApprovedLotteryValue = () => {
        const { drizzle, drizzleState } = this.props;
        const contract = drizzle.contracts.Lottery;
        const dataKey = contract.methods.getApprovedLotteryValue.call(drizzleState.accounts[0], { from: drizzleState.accounts[0] });
        this.setState({ dataKey });
    }

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
                this.getApprovedLotteryValue();
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
        const { Lottery } = this.props.drizzleState.contracts;
        const approvedValue = Lottery.getApprovedLotteryValue[this.state.dataKey];
        if(approvedValue && approvedValue.value >= this.props.drizzle.web3.utils.toBN(this.ticketPrice)){
            this.props.callback();
        }

        return (
            <div>
                <button className="btn btn-success" onClick={this.setValue}>Approve Lottery {approvedValue && approvedValue.value}</button>
                <div><span className={styles.ticketPrice}>Ticket costs {this.ticketPrice} Maia.</span></div>
                {!this.state.transactionStatus && this.getTxStatus()}
            </div>
        );
    }
}

export default ApproveLottery;