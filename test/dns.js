const Dns = artifacts.require("Dns");

function sleep(milliseconds) {
  const date = Date.now();
  let currentDate = null;
  do {
    currentDate = Date.now();
  } while (currentDate - date < milliseconds);
}

contract("Dns", async (accounts) => {
  // accounts are the list of account created by the Truffle (i.e. 10 key pair)
  // by default, the first account will deploy the contract
  it("should make deployer the owner", async () => {
    let dns = await Dns.deployed(); // get the deployed Dns contract
    console.log(dns.address);
    let owner = await dns.owner(); // call the getter on public state variable, https://solidity.readthedocs.io/en/v0.7.1/contracts.html#getter-functions
    assert.equal(owner, accounts[0]); // compare the expected owner with the actual owner
  });

  // Check that unregistered url is considered expired
  it("unregistered address should be expired", async () => {
    let dns = await Dns.deployed();
    let result = await dns.checkExpired("test.ntu", {
      from: accounts[1]
    });
    assert.equal(result, true);
  });

  // Check that 
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

  it("check can register url", async () => {
    let dns = await Dns.deployed();
    // sending 3 Ether to deposit() function from accounts[4],
    // Note that deposit() function in the contract doesn't have any input parameter,
    // but in test, we are allowed to pass one optional special object specifying ethers to send to this
    // contract while we are making this function call.
    // Another similar example here: https://www.trufflesuite.com/docs/truffle/getting-started/interacting-with-your-contracts#making-a-transaction
    let result = await dns.testRegisterFunc("test.ntu", accounts[2], {
      from: accounts[2]
      // value: web3.utils.toWei("3"), // all amount are expressed in wei, this is 3 Ether in wei
    });

    let address = await dns.getRegisteredURL("test.ntu");

    // get deposited balance
    assert.equal(address, accounts[2]);
  });

  it("check can register another url", async () => {
    let dns = await Dns.deployed();
    // sending 3 Ether to deposit() function from accounts[4],
    // Note that deposit() function in the contract doesn't have any input parameter,
    // but in test, we are allowed to pass one optional special object specifying ethers to send to this
    // contract while we are making this function call.
    // Another similar example here: https://www.trufflesuite.com/docs/truffle/getting-started/interacting-with-your-contracts#making-a-transaction
    let result = await dns.testRegisterFunc("test2.ntu", accounts[2], {
      from: accounts[2]
      // value: web3.utils.toWei("3"), // all amount are expressed in wei, this is 3 Ether in wei
    });

    let address = await dns.getRegisteredURL("test2.ntu");

    // get deposited balance
    assert.equal(address, accounts[2]);
  });

  it("check address list correct", async () => {
    let dns = await Dns.deployed();
    // sending 3 Ether to deposit() function from accounts[4],
    // Note that deposit() function in the contract doesn't have any input parameter,
    // but in test, we are allowed to pass one optional special object specifying ethers to send to this
    // contract while we are making this function call.
    // Another similar example here: https://www.trufflesuite.com/docs/truffle/getting-started/interacting-with-your-contracts#making-a-transaction
    let result = await dns.testRegisterFunc("test3.ntu", accounts[3], {
      from: accounts[2]
      // value: web3.utils.toWei("3"), // all amount are expressed in wei, this is 3 Ether in wei
    });

    let address_list = await dns.getAddresses({ from: accounts[2] })

    // get deposited balance
    // console.log(address_list);
    // console.log([accounts[2], accounts[3]]);
    assert.equal(JSON.stringify(address_list), JSON.stringify([accounts[2], accounts[3]]));
  });

  it("check cannot register same address (not expired)", async () => {
    let dns = await Dns.deployed();
    // sending 3 Ether to deposit() function from accounts[4],
    // Note that deposit() function in the contract doesn't have any input parameter,
    // but in test, we are allowed to pass one optional special object specifying ethers to send to this
    // contract while we are making this function call.
    // Another similar example here: https://www.trufflesuite.com/docs/truffle/getting-started/interacting-with-your-contracts#making-a-transaction
    let result = await dns.testRegisterFunc("test3.ntu", accounts[4], {
      from: accounts[2]
      // value: web3.utils.toWei("3"), // all amount are expressed in wei, this is 3 Ether in wei
    });

    // get deposited balance
    // console.log(result)
    // assert.equal(address_list, [accounts[2], accounts[3]]);
    const event = result.logs[0].args
    assert.equal(event._url, "not expired")
  });

  it("check old address deleted after no urls assigned to it", async () => {
    let dns = await Dns.deployed();
    sleep(60000);
    // sending 3 Ether to deposit() function from accounts[4],
    // Note that deposit() function in the contract doesn't have any input parameter,
    // but in test, we are allowed to pass one optional special object specifying ethers to send to this
    // contract while we are making this function call.
    // Another similar example here: https://www.trufflesuite.com/docs/truffle/getting-started/interacting-with-your-contracts#making-a-transaction
    let result = await dns.testRegisterFunc("test3.ntu", accounts[4], {
      from: accounts[2]
      // value: web3.utils.toWei("3"), // all amount are expressed in wei, this is 3 Ether in wei
    });

    // get deposited balance
    // console.log(result)
    // assert.equal(address_list, [accounts[2], accounts[3]]);
    let address_list = await dns.getAddresses({ from: accounts[2] })
    console.log(address_list)
    assert.equal(JSON.stringify(address_list), JSON.stringify([accounts[2], accounts[4]]));
    // const event = result.logs[0].args
    // assert.equal(event._url, "not expired")
  });


});
