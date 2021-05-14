import React from "react";
import maiaTokenIcon from './../../imgs/maia-token.png';
import styles from "./EntriesCurrentExtraction.module.css";

class EntriesCurrentExtraction extends React.Component {
    state = { numberOfEntries: null, prize: null, dataKeyPrize: null, dataKeyEntries: null };
    componentDidMount() {
        const { drizzle, drizzleState } = this.props;
        const contract = drizzle.contracts.Lottery;
        contract.events.NewEntry()
                            .on('data', (event) => {
                                const newNumberOfEntries = event.returnValues[0];
                                const newPrize = event.returnValues[1];

                                this.setState({numberOfEntries: newNumberOfEntries, prize: newPrize});
                            })
                            .on('changed', function(event){
                                console.warn(event);
                            })
                            .on('error', function(error){
                                console.warn(error);
                            });
        const dataKeyPrize = contract.methods.getBalanceInMaiaToken.cacheCall({ from: drizzleState.accounts[0] });
        const dataKeyEntries = contract.methods.getEntriesForCurrentExtraction.cacheCall({ from: drizzleState.accounts[0] });

        this.setState({ dataKeyEntries, dataKeyPrize });
    }

    render() {
        const { Lottery } = this.props.drizzleState.contracts;
        const newNumberOfEntries = Lottery.getEntriesForCurrentExtraction[this.state.dataKeyEntries];
        const newPrize = Lottery.getBalanceInMaiaToken[this.state.dataKeyPrize];
        var entries = "loading...";
        if(this.state.numberOfEntries){
            entries = this.state.numberOfEntries;
        }else if(newNumberOfEntries){
            entries = newNumberOfEntries.value;
        }

        var prize = "loading...";
        if(this.state.prize){
            prize = this.state.prize;
        }else if(newPrize){
            prize = newPrize.value;
        }

        return <div className={styles.container}><div>Total Entries: {entries}</div><div className={styles.totalPrize}>Total Prize: {prize}<img alt=""className={styles.ticketimg} src={maiaTokenIcon}/></div></div>;
    }
}

export default EntriesCurrentExtraction;