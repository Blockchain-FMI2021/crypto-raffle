import React from "react";
import toast from "react-hot-toast";

const successToast = (transactions, txHash) => toast.success(<div><div>Transaction status: `{transactions[txHash].status}`</div><div>`{txHash}`</div></div>);


class EnterLottery extends React.Component {
    state = { stackId: null, transactionDone: false };

    componentDidMount() {
        const { drizzle, drizzleState } = this.props;
        const contract = drizzle.contracts.MaiaToken;
        contract.events.Transfer()
        .on('data', (event) => {
            console.log(event);
        })
        .on('changed', function(event){
            console.warn(event);
        })
        .on('error', function(error){
            console.warn(error);
        });
    }

    setValue = () => {
        const { drizzle, drizzleState } = this.props;
        const contract = drizzle.contracts.Lottery;
        const stackId = contract.methods.enterLottery.cacheSend(drizzle.web3.utils.asciiToHex("16324546474849"), { from: drizzleState.accounts[0], gas: drizzle.web3.utils.toBN("1000000") });
        this.setState({ stackId });
    };

    getTxStatus = () => {
        const { transactions, transactionStack } = this.props.drizzleState;
        const txHash = transactionStack[this.state.stackId];
        if (!txHash) return null;

        var status = transactions[txHash] && transactions[txHash].status;
        if(status === 'success'){
            if(!this.state.transactionDone){
                this.setState({ transactionDone: true });
                successToast(transactions, txHash);
                this.props.callback();
            }
        }
    };

    render() {
        return (
            <div>
                <button className="btn btn-success" onClick={this.setValue}>Enter Lottery</button>
                {!this.state.transactionDone && this.getTxStatus()}
            </div>
        );
    }
}

export default EnterLottery;