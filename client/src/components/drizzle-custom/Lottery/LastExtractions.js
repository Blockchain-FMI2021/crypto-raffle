import React from "react";

class LastExtractions extends React.Component {
    state = { last5Extractions: null};

    componentDidMount() {
        const { drizzle, drizzleState } = this.props;
        const contract = drizzle.contracts.Lottery;
        contract.events.Winners()
                            .on('data', (event) => {
                                console.log(event);
                                const newNumberOfEntries = event.returnValues[0];
                                // this.setState({numberOfEntries: newNumberOfEntries});
                            })
                            .on('changed', function(event){
                                console.warn(event);
                            })
                            .on('error', function(error){
                                console.warn(error);
                            });
        const dataKey = contract.methods.getLast5Winnings.cacheCall({ from: drizzleState.accounts[0] });
        this.setState({ dataKey });
    }

    render() {
        const { Lottery } = this.props.drizzleState.contracts;
        const last5Winnings = Lottery.getLast5Winnings[this.state.dataKey];
        if(this.state.numberOfEntries){
            entries = this.state.numberOfEntries;
        }else if(newNumberOfEntries){
            entries = newNumberOfEntries.value;
        }
        return <p>Entries: {entries}</p>;
    }
}

export default LastExtractions;