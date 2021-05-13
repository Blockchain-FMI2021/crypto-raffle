import React from 'react';
import { DrizzleContext } from '@drizzle/react-plugin';
import { Drizzle } from '@drizzle/store';
import drizzleOptions from './drizzleOptions';
import { Switch, Route, BrowserRouter as Router, Redirect } from 'react-router-dom';
import MainPage from './components/MainPage';

import Loader from 'react-loader-spinner';

import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import * as serviceWorker from './serviceWorker';

const drizzle = new Drizzle(drizzleOptions);

const App = () => {
  return (
    <DrizzleContext.Provider drizzle={drizzle}>
      <DrizzleContext.Consumer>
        {drizzleContext => {
          const { drizzle, drizzleState, initialized } = drizzleContext;

          if (!initialized) {
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
          }

          return <MainPage drizzle={drizzle} drizzleState={drizzleState} />;

          // return (
          //   <Router>
          //     <div>
          //       <Switch>
          //         {/* <Route exact path="/" component={Login}></Route> */}
          //         {/* <Route exact path='/MainPage' component={MainPage}></Route> */}
          //         <Route exact path='/' component={MainPage}></Route>
          //       </Switch>
          //     </div>
          //   </Router>
          // );
        }}
      </DrizzleContext.Consumer>
    </DrizzleContext.Provider>
  );
};

export default App;
