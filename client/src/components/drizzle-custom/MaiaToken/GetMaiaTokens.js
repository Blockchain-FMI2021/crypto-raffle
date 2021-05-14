import React from "react";
import styles from "./GetMaiaTokens.module.css";
import maiaTokenIcon from './../../imgs/maia-token.png';

class GetMaiaTokens extends React.Component {
  state = { dataKey: null, transactionSuccess: false };

  componentDidMount() {
    const { drizzle, drizzleState, transactionSuccess } = this.props;
    const contract = drizzle.contracts.MaiaToken;
    const dataKey = contract.methods.balanceOf.cacheCall(drizzleState.accounts[0], { from: drizzleState.accounts[0] });
    this.setState({ dataKey });
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.transactionSuccess !== this.state.transactionSuccess) {
      const dataKey = this.props.drizzle.contracts.MaiaToken.methods.balanceOf.cacheCall(nextProps.drizzleState.accounts[0], { from: nextProps.drizzleState.accounts[0] });
      console.log(dataKey);
      console.log(nextProps.drizzle.contracts.MaiaToken);
      console.log(nextProps.drizzleState.contracts);
      this.setState({dataKey: dataKey, transactionSuccess: nextProps.transactionSuccess });
    }
  }

  render() {
    const { MaiaToken } = this.props.drizzleState.contracts;
    const myString = MaiaToken.balanceOf[this.state.dataKey];
    console.log('~', this.state.dataKey);
    return <div className={styles.container}><span className={styles.money}>Wallet: {myString && myString.value}</span><img alt=""className={styles.ticketimg} src={maiaTokenIcon}/></div>;
  }
}

export default GetMaiaTokens;