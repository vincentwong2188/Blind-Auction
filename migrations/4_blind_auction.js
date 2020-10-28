const BlindAuction = artifacts.require("BlindAuction");

module.exports = function(deployer) {
  deployer.deploy(BlindAuction, 180, 180, "dns.ntu", "0x70dAF8F5E03E96CE5647c1c2FB092A373402bc59");
};
