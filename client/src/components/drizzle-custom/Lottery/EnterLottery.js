import React from "react";

class EnterLottery extends React.Component {
    state = { stackId: null };

    setValue = () => {
        const { drizzle, drizzleState } = this.props;
        const contract = drizzle.contracts.Lottery;
        const stackId = contract.methods.enter.cacheSend(drizzle.web3.utils.asciiToHex("16324546474849"), { from: drizzleState.accounts[0], value: drizzle.web3.utils.toWei('0.01', 'ether'), gas: drizzle.web3.utils.toBN("1000000") });
        this.setState({ stackId });
    };

    getTxStatus = () => {
        const { transactions, transactionStack } = this.props.drizzleState;
        const txHash = transactionStack[this.state.stackId];
        if (!txHash) return null;
        return `Transaction status: ${transactions[txHash] && transactions[txHash].status}`;
    };

    render() {
        return (
            <div>
                <button onClick={this.setValue}>Enter Lottery</button>
                <div>{this.getTxStatus()}</div>
            </div>
        );
    }
}

export default EnterLottery;