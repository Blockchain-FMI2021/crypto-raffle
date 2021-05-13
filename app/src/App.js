import React from "react";
import { DrizzleContext } from "@drizzle/react-plugin";
import { Drizzle } from "@drizzle/store";
import drizzleOptions from "./drizzleOptions";
import { Switch, Route, BrowserRouter as Router, Redirect } from 'react-router-dom';
import Login from './components/Login';
import MainPage from './components/MainPage';
import "./App.css";
import 'bootstrap/dist/css/bootstrap.min.css';

const drizzle = new Drizzle(drizzleOptions);

const App = () => {
  return (
    <DrizzleContext.Provider drizzle={drizzle}>
      <DrizzleContext.Consumer>
        {drizzleContext => {
          const { drizzle, drizzleState, initialized } = drizzleContext;

          if (!initialized) {
            return "Loading..."
          }

          return (
            <Router>
              <div>
                <Switch>
                  <Route exact path="/" component={Login}></Route>
                  <Route exact path="/MainPage" component={MainPage}></Route>
                </Switch>
              </div>
            </Router>
          )
        }}
      </DrizzleContext.Consumer>
    </DrizzleContext.Provider>
  );
}

export default App;