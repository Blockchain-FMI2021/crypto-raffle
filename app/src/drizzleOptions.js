import Web3 from "web3";
import Lottery from "./contracts/Lottery.json";
import MaiaToken from "./contracts/MaiaToken.json";

const options = {
  contracts: [Lottery, MaiaToken],
  web3: {
    fallback: {
      type: 'ws',
      url: 'ws://127.0.0.1:7545'
    }
  },
  events: {
    Lottery: [
      "Winners"
    ],
    MaiaToken: [
      "Transfer",
      "Approval",
      "MinterRemoved",
      "MinterAdded"
    ]
  },
};

export default options;
