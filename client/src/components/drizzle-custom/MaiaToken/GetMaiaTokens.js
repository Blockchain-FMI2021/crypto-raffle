import React from "react";
import styles from "./GetMaiaTokens.module.css";
import maiaTokenIcon from './../../imgs/maia-token.png';

class GetMaiaTokens extends React.Component {
  state = { dataKey: null, transactionSuccess: false };

  componentDidMount() {
    const { drizzle, drizzleState } = this.props;
    const contract = drizzle.contracts.MaiaToken;
    const dataKey = contract.methods.balanceOf.cacheCall(drizzleState.accounts[0], { from: drizzleState.accounts[0] });
    this.setState({ dataKey });
  }

  render() {
    const { MaiaToken } = this.props.drizzleState.contracts;
    const myString = MaiaToken.balanceOf[this.state.dataKey];
    return <div className={styles.container}><span className={styles.money}>Wallet: {myString && myString.value}</span><img alt=""className={styles.ticketimg} src={maiaTokenIcon}/></div>;
  }
}

export default GetMaiaTokens;