import React from 'react';
import './App.css';
import GetMaiaTokens from './components/drizzle-custom/MaiaToken/GetMaiaTokens';
import EnterLottery from './components/drizzle-custom/Lottery/EnterLottery';
import GetPlayers from './components/drizzle-custom/Lottery/GetPlayers';

import MainPage from './components/visualComponents/MainPage';
import Loader from 'react-loader-spinner';


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
    if (this.state.loading)
      return (
        <div className='d-flex justify-content-center align-items-center' style={{ height: '100%', width: '100%' }}>
          <Loader
            type='Puff'
            color='#00BFFF'
            height={100}
            width={100}
            // timeout={1000}
          />
        </div>
      );
    return (
      <div className='App'>
        <MainPage />
        <GetMaiaTokens drizzle={this.props.drizzle} drizzleState={this.state.drizzleState} />
        <EnterLottery drizzle={this.props.drizzle} drizzleState={this.state.drizzleState} />
        <GetPlayers drizzle={this.props.drizzle} drizzleState={this.state.drizzleState} />
      </div>
    );
  }
}

export default App;
