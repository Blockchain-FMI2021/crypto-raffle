import Web3 from "web3";

const options = {
  web3: {
    block: false,
    customProvider: new Web3("ws://127.0.0.1:7545"),
  },
  contracts: [],
  events: {
  },
};

export default options;
