import React from "react";

class GetPlayers extends React.Component {
    state = { dataKey: null };

    componentDidMount() {
        const { drizzle, drizzleState } = this.props;
        const contract = drizzle.contracts.Lottery;
        const dataKey = contract.methods.getPlayers.cacheCall({}, { from: drizzleState.accounts[0] });
        this.setState({ dataKey });
    }

    render() {
        const { MaiaToken } = this.props.drizzleState.contracts;
        const numberOfEntries = MaiaToken.getPlayers[this.state.dataKey];
        console.log(numberOfEntries);
        return <p>Entries: {numberOfEntries && numberOfEntries.value}</p>;
    }
}

export default GetPlayers;