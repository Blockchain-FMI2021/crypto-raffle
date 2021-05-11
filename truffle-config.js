const path = require('path');
const HDWalletProvider = require('truffle-hdwallet-provider');

module.exports = {
  // See <http://truffleframework.com/docs/advanced/configuration>
  // to customize your Truffle configuration!
  contracts_build_directory: path.join(__dirname, 'app/src/contracts'),
  networks: {
    develop: {
      // default with truffle unbox is 7545, but we can use develop to test changes, ex. truffle migrate --network develop
      host: '127.0.0.1',
      port: 7545,
      network_id: '5777',
    },
    rinkeby: {
      provider: () => {
        return new HDWalletProvider(
          'popular onion derive fantasy rally veteran before boost garage disagree kiss road',
          'https://rinkeby.infura.io/v3/8da0ce4f462d4faca84ba29e70fe5066'
        );
      },
      network_id: '4',
      gas: 3000000,
      gasPrice: 10000000000,
    },
  },
  compilers: {
    solc: {
      version: '0.5.0',
    },
  },
};
