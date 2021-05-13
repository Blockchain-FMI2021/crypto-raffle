import React from 'react';
import { Switch, Route, BrowserRouter as Router, Redirect } from 'react-router-dom';
import Login from './components/Login';
import MainPage from './components/MainPage';

import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
function App() {
  return (
    <Router>
          <div>
          <Switch>
            {/* login */}
            <Route exact path="/" component={Login}></Route>     
            <Route exact path="/MainPage" component={MainPage}></Route>   
          </Switch>        
        </div>
      </Router>
  );
}

export default App;
