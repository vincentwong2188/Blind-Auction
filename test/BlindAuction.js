const { assert } = require('chai')

const { soliditySha3, toWei, fromAscii } = require("web3-utils");

const BlindAuction = artifacts.require('./mocks/MockBlindAuction.sol')

require('chai')
  .use(require('chai-as-promised'))
  .should()

// accounts are test accounts on local network
contract('BlindAuction', ([deployer, bidder1, test, bidder2]) => {
  let blindAuction
  let deployURL
  before(async () => {
    deployURL = "dns.ntu"
    blindAuction = await BlindAuction.new(10, 10, deployURL)
  })
  describe('deployment', async () => {
    it('deploys successfully', async () => {
      const address = await blindAuction.address
      assert.notEqual(address, 0x0)
      assert.notEqual(address, '')
      assert.notEqual(address, null)
      assert.notEqual(address, undefined)
    })

    it('has bidding time', async () => {
      const biddingEnd = await blindAuction.biddingEnd()
      assert.notEqual(biddingEnd, 0)
    })

    it('has reveal time', async () => {
      const revealEnd = await blindAuction.revealEnd()
      assert.notEqual(revealEnd, 0)
    })

    it('has url', async () => {
      const url = await blindAuction.url()
      assert.equal(url, deployURL)
    })
  })

  describe('bids', async () => {
    let bid1
    let bid2
    let reveal
    let reveal2
    let auctionEnd
    let bidder1Withdraw
    let bidder2Withdraw
    let hashBid1
    let hashBid2
    before(async () => {
      // use URL below for keccak256 hash in JS
      // https://blog.8bitzen.com/posts/18-03-2019-keccak-abi-encodepacked-with-javascript/
      hashBid1 = soliditySha3(
        toWei("1"), // hash need to change to wei
        true,
        fromAscii("secret").padEnd(66, 0)
      );
      // remember change secret to bytes
      // pad secret to be 32bytes cause the solidity contract will convert it to bytes32 to hash
      // hash would be different if dont pad
      hashBid2 = soliditySha3(
        toWei("2"), // hash need to change to Wei
        true,
        fromAscii("secret").padEnd(66, 0) // pad with 66 '0s' so that fit byte32 to match sol func
      );
      // Sequential order of contract function calls as function can only be called after each other
      // therefore all to be called in sequence first to ensure they are executed in order
      // if not JS Async may cause some to execute out of order causing error
      bid1 = await blindAuction.bid(hashBid1, bidder1, {from: bidder1, value: toWei("1")})
      bid2 = await blindAuction.bid(hashBid2, bidder2, {from: bidder2, value: toWei("2")})
      // move time ahead by 10s so that can test onlyAfter & onlyBefore
      // for reveal bid to ensure it is after bidding time end and before reveal time end
      await blindAuction.moveAheadTime(10)
      // NOTE: all ether values to be converted to Wei 
<<<<<<< HEAD
      reveal = await blindAuction.reveal([toWei("1")], [true], [fromAscii("secret")], {from: bidder1})
      reveal2 = await blindAuction.reveal([toWei("2")], [true], [fromAscii("secret")], {from: bidder2})
=======
      reveal = await blindAuction.reveal([toWei("1")], [true], [fromAscii("secret")], { from: bidder1 })
      reveal2 = await blindAuction.reveal([toWei("2")], [true], [fromAscii("secret")], { from: bidder2 })
>>>>>>> f2f0a50af1f1f5c91472534910a4216af53261bb
      // move time ahead by 10s so that can test onlyAfter & onlyBefore
      // for end auction to ensure it is after reveal time end
      await blindAuction.moveAheadTime(10)
      auctionEnd = await blindAuction.auctionEnd()
      // withdraw only can be executed after auction ends
      bidder1Withdraw = await blindAuction.withdraw({from: bidder1})
      bidder2Withdraw = await blindAuction.withdraw({from: bidder2})
    })
    it('send bid', async () => {
      const event = bid1.logs[0].args
      assert.equal(event.bidHash, hashBid1, 'Hashed bid is correct')
      assert.equal(event.deposit, toWei("1"), 'Deposit is correct')
      assert.equal(event.bidder, bidder1, 'bidder is correct')
      // FAILURE: bid must have blinded bid content
      await blindAuction.bid("", bidder1).should.be.rejected;
    
    })
<<<<<<< HEAD
=======

    it('reveal bid', async () => {
      const event_process = reveal.logs[0].args
      const event2_process = reveal2.logs[0].args
      assert.equal(event_process.deposits, 0, 'Process Reveal Deposits for bidder1 is correct - Deposits taken as highest bidder at that time')
      assert.equal(event2_process.deposits, 0, 'Process Reveal Deposits for bidder2 is correct - Deposits taken as highest bidder')
    })
>>>>>>> f2f0a50af1f1f5c91472534910a4216af53261bb

    it('reveal bid', async () => {
      const event_process = reveal.logs[0].args
      const event2_process = reveal2.logs[0].args
      assert.equal(event_process.deposits, 0, 'Process Reveal Deposits for bidder1 is correct - Deposits taken as highest bidder at that time')
      assert.equal(event2_process.deposits, 0, 'Process Reveal Deposits for bidder2 is correct - Deposits taken as highest bidder')
    })

    it('auction end', async () => {
      const event = auctionEnd.logs[0].args
      assert.equal(event.winner, bidder2, 'Winner of auction is correct')
      // NOTE: all ether values to be converted to Wei 
      assert.equal(event.highestBid, toWei("2"), 'Highest bid of auction is correct')
    })

    it('withdraw', async () => {
      const event = bidder1Withdraw.logs[0].args
      const event2 = bidder2Withdraw.logs[0].args
      assert.equal(event.amount, toWei("1"), 'Withdrawal bidder1 amount correct')
      assert.equal(event2.amount, 0, 'Withdrawal bidder2 amount correct')
    })
  })
})