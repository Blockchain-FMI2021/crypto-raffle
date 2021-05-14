import React from "react";
import styles from "./ApproveLottery.module.css";
import toast, { Toaster } from "react-hot-toast";

const successToast = (transactions, txHash) => toast.success(<div><div>Transaction status: `{transactions[txHash].status}`</div><div>`{txHash}`</div></div>);

class ApproveLottery extends React.Component {
    state = { stackId: null, dataKey: null };

    setValue = () => {
        console.log(this.props);
        const { drizzle, drizzleState } = this.props;
        const contract = drizzle.contracts.MaiaToken;
        const stackId = contract.methods.approve.cacheSend(drizzle.contracts.Lottery.address, drizzle.web3.utils.toBN("100"), { from: drizzleState.accounts[0], gas: drizzle.web3.utils.toBN("1000000") });
        this.setState({ stackId });
    };

    getApprovedLotteryValue = () => {
        const { drizzle, drizzleState } = this.props;
        const contract = drizzle.contracts.Lottery;
        const dataKey = contract.methods.getApprovedLotteryValue.cacheCall(drizzleState.accounts[0], { from: drizzleState.accounts[0] });
        this.setState({ dataKey });
    }

    getTxStatus = () => {
        const { transactions, transactionStack } = this.props.drizzleState;
        const txHash = transactionStack[this.state.stackId];
        if (!txHash) return null;
        
        var status = transactions[txHash] && transactions[txHash].status;
        if(status === 'success'){
            if(!this.state.dataKey){
                this.getApprovedLotteryValue();
                successToast(transactions, txHash);
                this.props.callback();
            }
        }
    };

    render() {
        const { Lottery } = this.props.drizzleState.contracts;
        const approvedValue = Lottery.getApprovedLotteryValue[this.state.dataKey];

        return (
            <div>
                <button className="btn btn-success" onClick={this.setValue}>Approve Lottery</button>
                <div><span className={styles.ticketPrice}>Ticket costs 100 Maia.</span></div>
                {this.getTxStatus()}
            </div>
        );
    }
}

export default ApproveLottery;