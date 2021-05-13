import React from "react";
import './App.css';
import GetMaiaTokens from "./components/drizzle-custom/MaiaToken/GetMaiaTokens";
import EnterLottery from "./components/drizzle-custom/Lottery/EnterLottery";
import GetPlayers from "./components/drizzle-custom/Lottery/GetPlayers";


class App extends React.Component {
  state = { loading: true, drizzleState: null };

  componentDidMount() {
    const { drizzle } = this.props;

    this.unsubscribe = drizzle.store.subscribe(() => {
      const drizzleState = drizzle.store.getState();
      if (drizzleState.drizzleStatus.initialized) {
        this.setState({ loading: false, drizzleState });
      }
    });
  }

  componentWillUnmount() {
    this.unsubscribe();
  }

  render() {
    if (this.state.loading) return "Loading Drizzle...";
    return (
      <div className="App">
        <GetMaiaTokens
          drizzle={this.props.drizzle}
          drizzleState={this.state.drizzleState}
        />
        <EnterLottery
          drizzle={this.props.drizzle}
          drizzleState={this.state.drizzleState}
        />
        <GetPlayers
          drizzle={this.props.drizzle}
          drizzleState={this.state.drizzleState}
        />
      </div>
    );
  }
}

export default App;
