const Dns = artifacts.require("Dns");

contract("Dns", async (accounts) => {
  // accounts are the list of account created by the Truffle (i.e. 10 key pair)
  // by default, the first account will deploy the contract
  it("should make deployer the owner", async () => {
    let dns = await Dns.deployed(); // get the deployed Dns contract
    let owner = await dns.owner(); // call the getter on public state variable, https://solidity.readthedocs.io/en/v0.7.1/contracts.html#getter-functions
    assert.equal(owner, accounts[0]); // compare the expected owner with the actual owner
  });

  it("unregistered address should be expired", async () => {
    let dns = await Dns.deployed();
    let result = await dns.checkExpired("test.ntu", {
      from: accounts[1]
    });
    assert.equal(result, true);
  });

  it("check auction ended on unregistered url", async () => {
    let dns = await Dns.deployed();
    // sending 3 Ether to deposit() function from accounts[4],
    // Note that deposit() function in the contract doesn't have any input parameter,
    // but in test, we are allowed to pass one optional special object specifying ethers to send to this
    // contract while we are making this function call.
    // Another similar example here: https://www.trufflesuite.com/docs/truffle/getting-started/interacting-with-your-contracts#making-a-transaction
    let result = await dns.checkAuctionEnded("test.ntu", {
      from: accounts[1]
      // value: web3.utils.toWei("3"), // all amount are expressed in wei, this is 3 Ether in wei
    });

    // get deposited balance
    assert.equal(result, true);
  });
});
