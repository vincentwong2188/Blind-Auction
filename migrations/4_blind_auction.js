const BlindAuction = artifacts.require("BlindAuction");

module.exports = function(deployer) {
  deployer.deploy(BlindAuction, 180, 180, "dns.ntu");
};
