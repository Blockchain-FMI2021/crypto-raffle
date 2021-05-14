import React from 'react';
import './App.css';
import GetMaiaTokens from './components/drizzle-custom/MaiaToken/GetMaiaTokens';
import EnterLottery from './components/drizzle-custom/Lottery/EnterLottery';
import ApproveLottery from './components/drizzle-custom/Lottery/ApproveLottery';
import EntriesCurrentExtraction from './components/drizzle-custom/Lottery/EntriesCurrentExtraction';

import MainPage from './components/visualComponents/MainPage';
import Loader from 'react-loader-spinner';

import 'bootstrap/dist/css/bootstrap.min.css';
import toast, { Toaster } from "react-hot-toast";


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
        <Toaster position="bottom-right" toastOptions={{
                                        success: {
                                                  style: {
                                                            width: '400px',
                                                            background: '#198754',
                                                            color: 'white',
                                                            textAlign: 'left',
                                                            fontSize: '8px',
                                                            display:'flex',
                                                            flexFlow: 'column',
                                                            flexWrap: 'no-wrap',
                                                            alignItems: 'center'
                                                          },
                                                 },
                                        loading: {
                                                  style: {
                                                            width: '400px',
                                                            background: '#606060',
                                                            color: 'white',
                                                            textAlign: 'left',
                                                            fontSize: '8px',
                                                            display:'flex',
                                                            flexFlow: 'column',
                                                            flexWrap: 'no-wrap',
                                                            alignItems: 'center'
                                                          },
                                                 },
                                        error: {
                                                  style: {
                                                            width: '400px',
                                                            background: 'red',
                                                            color: 'white',
                                                            textAlign: 'left',
                                                            fontSize: '8px',
                                                            display:'flex',
                                                            flexFlow: 'column',
                                                            flexWrap: 'no-wrap',
                                                            alignItems: 'center'
                                                          },
                                                 },
                                      }}
        />
        <MainPage drizzle={this.props.drizzle} drizzleState={this.state.drizzleState} />
        {/* <GetMaiaTokens drizzle={this.props.drizzle} drizzleState={this.state.drizzleState} />
        <EnterLottery drizzle={this.props.drizzle} drizzleState={this.state.drizzleState} />
        <ApproveLottery drizzle={this.props.drizzle} drizzleState={this.state.drizzleState} />
        <EntriesCurrentExtraction drizzle={this.props.drizzle} drizzleState={this.state.drizzleState} /> */}
      </div>
    );
  }
}

export default App;
