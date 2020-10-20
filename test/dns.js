const Dns = artifacts.require("Dns");

contract("Dns", async (accounts) => {
  // accounts are the list of account created by the Truffle (i.e. 10 key pair)
  // by default, the first account will deploy the contract
  it("should make deployer the owner", async () => {
    let dns = await Dns.deployed(); // get the deployed Bank contract
    let owner = await dns.owner(); // call the getter on public state variable, https://solidity.readthedocs.io/en/v0.7.1/contracts.html#getter-functions
    assert.equal(owner, accounts[0]); // compare the expected owner with the actual owner
  });

  it("can register address", async () => {
    let dns = await Dns.deployed();
    // sending 3 Ether to deposit() function from accounts[4],
    // Note that deposit() function in the contract doesn't have any input parameter,
    // but in test, we are allowed to pass one optional special object specifying ethers to send to this
    // contract while we are making this function call.
    // Another similar example here: https://www.trufflesuite.com/docs/truffle/getting-started/interacting-with-your-contracts#making-a-transaction
    let result = await dns.register(accounts[1], "test.ntu", {
      from: accounts[0]
    });

    // get deposited balance
    let resolution = await dns.lookup_address("test.ntu", { from: accounts[4] });
    assert.equal(resolution, accounts[1]);
  });

  it("can reverse lookup", async () => {
    let dns = await Dns.deployed();
    // sending 3 Ether to deposit() function from accounts[4],
    // Note that deposit() function in the contract doesn't have any input parameter,
    // but in test, we are allowed to pass one optional special object specifying ethers to send to this
    // contract while we are making this function call.
    // Another similar example here: https://www.trufflesuite.com/docs/truffle/getting-started/interacting-with-your-contracts#making-a-transaction
    let result = await dns.reverse_lookup(accounts[1], {
      from: accounts[4]
      // value: web3.utils.toWei("3"), // all amount are expressed in wei, this is 3 Ether in wei
    });

    // get deposited balance
    assert.equal(result.toString(), "test.ntu");
  });
});
