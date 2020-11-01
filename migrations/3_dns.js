const Dns = artifacts.require("Dns"); // importing artifacts from Truffle compile

module.exports = function (deployer) {
  // deployer is an object provided by Truffle to handle migration
  deployer.deploy(Dns, 300, 180, 60); // now, we ask deployer to deploy our Bank.sol contract
};