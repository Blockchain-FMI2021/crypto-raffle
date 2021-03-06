import React from "react";
import toast from "react-hot-toast";
import keccak256 from 'keccak256';

const successToast = (transactions, txHash) => toast.success(<div><div>Transaction status: `{transactions[txHash].status}`</div><div>`{txHash}`</div></div>);
const failToast = (transactions, txHash) => toast.error(<div><div>Transaction status: `{transactions[txHash].status}`</div><div>`{txHash}`</div></div>);
const loadingToast = (transactions, txHash) => toast.loading(<div><div>Transaction status: `{transactions[txHash].status}`</div><div>`{txHash}`</div></div>);
const wrongSelectionToast = () => toast.error(<div style={{ fontSize: '15px;' }}>Please select 6 numbers.</div>);

class EnterLottery extends React.Component {
    state = { stackId: null, transactionStatus: "pending", loadingToastId: null };

    setValue = (numbers) => {
        const entry = `0x${keccak256(numbers.join('')).toString('hex')}`;
        // drizzle.web3.utils.asciiToHex(entry)
        console.log(entry);
        const { drizzle, drizzleState } = this.props;
        const contract = drizzle.contracts.Lottery;
        const stackId = contract.methods.enterLottery.cacheSend(entry, { from: drizzleState.accounts[0], gas: drizzle.web3.utils.toBN("1000000") });
        this.setState({ stackId, transactionStatus: null });
    };

    getTxStatus = () => {
        const { transactions, transactionStack } = this.props.drizzleState;
        const txHash = transactionStack[this.state.stackId];
        if (!txHash) return null;
        var status = transactions[txHash] && transactions[txHash].status;
        switch (status) {
            case 'success':
                if (this.state.loadingToastId) {
                    toast.dismiss(this.state.loadingToastId);
                    this.setState({ loadingToastId: null });
                }
                this.setState({ transactionStatus: 'success' });
                successToast(transactions, txHash);
                this.props.callback();
                break;
            case 'pending':
                if (!this.state.loadingToastId) {
                    const toastId = loadingToast(transactions, txHash);
                    this.setState({ loadingToastId: toastId });
                }
                break;
            case 'error':
                if (this.state.loadingToastId) {
                    toast.dismiss(this.state.loadingToastId);
                    this.setState({ loadingToastId: null });
                }
                const toastId = failToast(transactions, txHash);
                break;
            default:
                break;
        }
    };

    render() {
        return (
            <div>
                <button className="btn btn-success" onClick={() => {
                    let numbers = this.props.buyIn();
                    if (numbers.length === 6) {
                        this.setValue(numbers);
                    }
                    else {
                        wrongSelectionToast();
                    }
                }}>Enter Lottery</button>
                {!this.state.transactionStatus && this.getTxStatus()}
            </div>
        );
    }
}

export default EnterLottery;