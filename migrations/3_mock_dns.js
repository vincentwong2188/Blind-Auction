const Dns = artifacts.require("MockDns"); // importing artifacts from Truffle compile

module.exports = function (deployer) {
  // deployer is an object provided by Truffle to handle migration
  deployer.deploy(Dns, 180, 180, 60 * 60); // now, we ask deployer to deploy our Bank.sol contract
};