<<<<<<< HEAD
import React from "react";
import { DrizzleContext } from "@drizzle/react-plugin";
import { Drizzle } from "@drizzle/store";
import drizzleOptions from "./drizzleOptions";
import { Switch, Route, BrowserRouter as Router, Redirect } from 'react-router-dom';
=======
import React from 'react';
import { DrizzleContext } from '@drizzle/react-plugin';
import { Drizzle } from '@drizzle/store';
import drizzleOptions from './drizzleOptions';
import Loader from 'react-loader-spinner';

// import { Switch, Route, BrowserRouter as Router, Redirect } from 'react-router-dom';
// import Login from './components/Login';

>>>>>>> 2926c7f80e176530aa7ecbfccd7b9795dca3fc46
import MainPage from './components/MainPage';

import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
<<<<<<< HEAD
import * as serviceWorker from './serviceWorker';

=======
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';
>>>>>>> 2926c7f80e176530aa7ecbfccd7b9795dca3fc46

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

<<<<<<< HEAD
          return <MainPage drizzle={drizzle} drizzleState={drizzleState} />;
=======
<<<<<<< HEAD
          return (
            <Router>
              <div>
                <Switch>
                  <Route exact path="/" component={() => <MainPage drizzle={drizzle} drizzleState={drizzleState}/>}></Route>
                </Switch>
              </div>
            </Router>
          )
=======
          return <MainPage />;
>>>>>>> a28595cd429403b9deb685a17684e2c67254e592

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
>>>>>>> 2926c7f80e176530aa7ecbfccd7b9795dca3fc46
        }}
      </DrizzleContext.Consumer>
    </DrizzleContext.Provider>
  );
};

export default App;
