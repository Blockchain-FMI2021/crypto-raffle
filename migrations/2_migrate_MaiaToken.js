var MaiaToken = artifacts.require("MaiaToken");

module.exports = function(deployer) {
  const _name = "MaiaToken";
  const _symbol = "Maia"
  const _decimals = 1;
  deployer.deploy(MaiaToken, _name, _symbol, _decimals);
};