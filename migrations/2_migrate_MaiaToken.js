var MaiaToken = artifacts.require("MaiaToken");
var Lottery = artifacts.require('Lottery');

module.exports = function(deployer) {
  const _name = "MaiaToken";
  const _symbol = "Maia"
  const _decimals = 1;
  deployer.deploy(MaiaToken, _name, _symbol, _decimals).then(function(){
    return deployer.deploy(Lottery, MaiaToken.address)
  });
};
