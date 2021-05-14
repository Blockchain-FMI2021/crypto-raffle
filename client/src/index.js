import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

// import drizzle functions and contract artifact
import { Drizzle, generateStore } from "@drizzle/store";
import MaiaToken from "./contracts/MaiaToken.json";
import Lottery from "./contracts/Lottery.json";

// let drizzle know what contracts we want and how to access our test blockchain
const options = {
  contracts: [Lottery, MaiaToken],
  web3: {
    fallback: {
      type: 'ws',
      url: 'ws://127.0.0.1:7545'
    }
  },
  syncAlways:true,
  events: {
    Lottery: [
      "Winners",
      "NewEntry"
    ],
    MaiaToken: [
      "Transfer",
      "Approval",
      "MinterRemoved",
      "MinterAdded"
    ]
  },
};

const drizzleStore = generateStore(options);
const drizzle = new Drizzle(options, drizzleStore);

ReactDOM.render(<App drizzle={drizzle} />, document.getElementById('root'));


// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
