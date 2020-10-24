const { assert } = require('chai')

const { soliditySha3, toWei, fromAscii } = require("web3-utils");

const BlindAuction = artifacts.require('./BlindAuction.sol')

require('chai')
  .use(require('chai-as-promised'))
  .should()

  // accounts are test accounts on local network
  contract('BlindAuction', ([deployer, bidder1, bidder2]) => {
      let blindAuction

      before(async () => {
        blindAuction = await BlindAuction.deployed(1, 1)
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
      })

      describe('bids', async () => {
        let result1
        let result2
        let hashBid1
        let hashBid2
        before(async () => {
          // use URL below for keccak256 hash in JS
          // https://blog.8bitzen.com/posts/18-03-2019-keccak-abi-encodepacked-with-javascript/
          hashBid1 = soliditySha3(
            1,
            false,
            fromAscii("secret").padEnd(66, 0)
          );
          // remember change secret to bytes
          // pad secret to be 32bytes cause the solidity contract will convert it to bytes32 to hash
          // hash would be different if dont pad
          hashBid2 = soliditySha3(
            2,
            false,
            fromAscii("secret").padEnd(66, 0)
          );
          console.log(fromAscii("secret").padEnd(66, 0))
          result1 = await blindAuction.bid(hashBid1, bidder1, {from: deployer, value: toWei("1")})
          result2 = await blindAuction.bid(hashBid2, bidder2, {from: deployer, value: toWei("2")})
        })
        it('send bid', async () => {
          
          const event = result1.logs[0].args
          assert.equal(event.bidHash, hashBid1, 'Hashed bid is correct')
          assert.equal(event.deposit, toWei("1"), 'Deposit is correct')
          assert.equal(event.bidder, bidder1, 'bidder is correct')
          // FAILURE: bid must have blinded bid content
          await blindAuction.bid("", bidder1).should.be.rejected;
        
        })

        it('reveal bid', async () => {
          const reveal = await blindAuction.reveal([1], [false], [fromAscii("secret")], {from: bidder1})
          const reveal2 = await blindAuction.reveal([2], [false], [fromAscii("secret")], {from: bidder2})
          const event = reveal.logs[0].args
          const event2 = reveal2.logs[0].args
          // assert.equal(event.refund, 1, 'Amount refunded correct')
          // assert.equal(event2.refund, 0, 'Amount of highest bidder not refunded')
        })

        it('auction end', async () => {
          const end = await blindAuction.auctionEnd()
          const event = end.logs[0].args
          assert.equal(event.winner, bidder2, 'Winner of auction is correct')
          assert.equal(event.highestBid, 2, 'Highest bid of auction is correct')
        })
      })
  })