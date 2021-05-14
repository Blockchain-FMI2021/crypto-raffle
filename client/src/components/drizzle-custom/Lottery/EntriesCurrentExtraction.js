import React from "react";

class EntriesCurrentExtraction extends React.Component {
    state = { numberOfEntries: null, dataKey: null };

    componentDidMount() {
        const { drizzle, drizzleState } = this.props;
        const contract = drizzle.contracts.Lottery;
        console.log(contract);
        contract.events.NewEntry()
                            .on('data', (event) => {
                                const newNumberOfEntries = event.returnValues[0];
                                this.setState({numberOfEntries: newNumberOfEntries});
                            })
                            .on('changed', function(event){
                                console.warn(event);
                            })
                            .on('error', function(error){
                                console.warn(error);
                            });
        const dataKey = contract.methods.getEntriesForCurrentExtraction.cacheCall({ from: drizzleState.accounts[0] });
        this.setState({ dataKey });
    }

    render() {
        const { Lottery } = this.props.drizzleState.contracts;
        const newNumberOfEntries = Lottery.getEntriesForCurrentExtraction[this.state.dataKey];
        var entries = "loading...";
        if(this.state.numberOfEntries){
            entries = this.state.numberOfEntries;
        }else if(newNumberOfEntries){
            entries = newNumberOfEntries.value;
        }

        return <p>Entries: {entries}</p>;
    }
}

export default EntriesCurrentExtraction;