import React from "react";
import styles from "./GetMaiaTokens.module.css";
import maiaTokenIcon from './../../imgs/maia-token.png';

class GetMaiaTokens extends React.Component {
  state = { dataKey: null };

  componentDidMount() {
    const { drizzle, drizzleState } = this.props;
    const contract = drizzle.contracts.MaiaToken;
    // let drizzle know we want to watch the `myString` method
    const dataKey = contract.methods.balanceOf.cacheCall(drizzleState.accounts[0], { from: drizzleState.accounts[0] });

    // save the `dataKey` to local component state for later reference
    this.setState({ dataKey });
  }

  render() {
    // get the contract state from drizzleState
    const { MaiaToken } = this.props.drizzleState.contracts;

    // using the saved `dataKey`, get the variable we're interested in
    const myString = MaiaToken.balanceOf[this.state.dataKey];

    // if it exists, then we display its value
    return <div className={styles.container}><span className={styles.money}>Wallet: {myString && myString.value}</span><img alt=""className={styles.ticketimg} src={maiaTokenIcon}/></div>;
  }
}

export default GetMaiaTokens;