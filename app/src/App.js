import React from 'react';
import { DrizzleContext } from '@drizzle/react-plugin';
import { Drizzle } from '@drizzle/store';
import drizzleOptions from './drizzleOptions';
import Loader from 'react-loader-spinner';

// import { Switch, Route, BrowserRouter as Router, Redirect } from 'react-router-dom';
// import Login from './components/Login';

import MainPage from './components/MainPage';

import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';

const drizzle = new Drizzle(drizzleOptions);

const App = () => {
  return (
    <DrizzleContext.Provider drizzle={drizzle}>
      <DrizzleContext.Consumer>
        {drizzleContext => {
          const { drizzle, drizzleState, initialized } = drizzleContext;

          if (!initialized) {
            return (
              <div class='d-flex justify-content-center align-items-center' style={{ height: '100%', width: '100%', border: '1px solid red' }}>
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

          return <MainPage />;

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
