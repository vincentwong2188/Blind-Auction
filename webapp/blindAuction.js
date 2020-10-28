import { useState, useRef, useEffect } from "react";
import detectEthereumProvider from "@metamask/detect-provider";
// NOTE: be aware of this: https://flaviocopes.com/parcel-regeneratorruntime-not-defined/
import Web3 from "web3";
const BigNumber = require('bignumber.js');
const { soliditySha3, toWei, fromAscii } = require("web3-utils");
// const keccak256 = require('keccak256');

// importing a compiled contract artifact which contains function signature etc. to interact
import artifact from "../build/contracts/BlindAuction.json"; // REMEMBER TO CHANGE THIS!!!

const myAddress = "0x612f3f3bc105eb95b14Af4A93D9788cC888E6054"; // MAY NEED TO FILL UP
// const infuraWSS = `wss://ropsten.infura.io/ws/v3/58dd641dd5c54a49b9418a8e2e4e17c5`; // PLEASE CHANGE IT TO YOURS (changed)
const infuraWSS = `wss://goerli.infura.io/ws/v3/58dd641dd5c54a49b9418a8e2e4e17c5`; // PLEASE CHANGE IT TO YOURS (changed)

const CHAIN_ID = 5;
// run $ truffle migrate --network ropsten --reset
// export const BlindAuctionContractAddress = ""; // TO FILL UP!!
// export const Testnet = "ropsten"; // PLEASE CHANGE IT TO YOURS (changed)
export const Testnet = "goerli"; // PLEASE CHANGE IT TO YOURS (changed)

const web3 = new Web3(
    Web3.currentProvider || new Web3.providers.WebsocketProvider(infuraWSS)
);
// doc here: https://web3js.readthedocs.io/en/v1.2.11/web3.html#providers

// const contract = new web3.eth.Contract(artifact.abi, BlindAuctionContractAddress); // Need to put this into each function

export const biddingEnd = async (contractAddress) => {
    const contract = new web3.eth.Contract(artifact.abi, contractAddress); // Need to put this into each function
    let result = BigNumber(await contract.methods.biddingEnd().call({ from: myAddress }));
    let output = result.c[0];

    return output;
}

export const revealEnd = async (contractAddress) => {
    const contract = new web3.eth.Contract(artifact.abi, contractAddress); // Need to put this into each function
    let result = BigNumber(await contract.methods.revealEnd().call({ from: myAddress }));
    let output = result.c[0];

    return output;
}

export const bid = async (sendValue, value, real, secret, contractAddress) => {
    // contract = new web3.eth.Contract(artifact.abi, contractAddress);

    let hashBid1 = soliditySha3(
        toWei(value), // hash need to change to wei
        real,
        fromAscii(secret).padEnd(66, 0)
    ); // to make real a boolean

    console.log("hashBid1: " + hashBid1)

    const provider = await detectEthereumProvider();

    if (provider) {
        // From now on, this should always be true:
        // provider === window.ethereum
        ethereum.request({
            method: "eth_sendTransaction",
            params: [
                {
                    from: ethereum.selectedAddress,
                    to: contractAddress,
                    value: parseInt(web3.utils.toWei(sendValue, 'ether')).toString(16),
                    gas: web3.utils.toHex(46899),
                    gasPrice: web3.utils.toHex(15000),

                    data: web3.eth.abi.encodeFunctionCall(
                        {
                            name: "bid",
                            type: "function",
                            inputs: [
                                {
                                    type: 'bytes32',
                                    name: 'blindedBid'
                                }
                            ],
                        },
                        [hashBid1]
                    ), // https://web3js.readthedocs.io/en/v1.2.11/web3-eth-abi.html#encodefunctioncall
                    chainId: CHAIN_ID, // ropsten
                },
            ],
        });
    } else {
        console.log("Please install MetaMask!");
    }
}

export const reveal = async (values, reals, secrets, contractAddress) => {
    // contract = new web3.eth.Contract(artifact.abi, contractAddress);

    const provider = await detectEthereumProvider();

    if (provider) {
        // From now on, this should always be true:
        // provider === window.ethereum
        ethereum.request({
            method: "eth_sendTransaction",
            params: [
                {
                    from: ethereum.selectedAddress,
                    to: contractAddress,
                    value: parseInt(web3.utils.toWei('0', 'ether')).toString(16),
                    gas: web3.utils.toHex(46899),
                    gasPrice: web3.utils.toHex(15000),

                    data: web3.eth.abi.encodeFunctionCall(
                        {
                            name: "reveal",
                            type: "function",
                            inputs: [
                                {
                                    type: 'uint256[]',
                                    name: 'values'
                                },
                                {
                                    type: 'bool[]',
                                    name: 'reals'
                                },
                                {
                                    type: 'bytes32[]',
                                    name: 'secrets'
                                }
                            ],
                        },
                        [values, reals, secrets]
                    ), // https://web3js.readthedocs.io/en/v1.2.11/web3-eth-abi.html#encodefunctioncall
                    chainId: CHAIN_ID, // ropsten
                },
            ],
        });
    } else {
        console.log("Please install MetaMask!");
    }
}

export const auctionEnd = async (contractAddress) => {
    // Using MetaMask API to send transaction
    //
    // please read: https://docs.metamask.io/guide/ethereum-provider.html#ethereum-provider-api
    const provider = await detectEthereumProvider();
    if (provider) {
        // From now on, this should always be true:
        // provider === window.ethereum
        ethereum.request({
            method: "eth_sendTransaction",
            params: [
                {
                    from: ethereum.selectedAddress,
                    to: contractAddress,
                    value: parseInt(web3.utils.toWei('0', 'ether')).toString(16),
                    data: web3.eth.abi.encodeFunctionCall(
                        {
                            name: "auctionEnd",
                            type: "function",
                            inputs: [],
                        },
                        []
                    ), // https://web3js.readthedocs.io/en/v1.2.11/web3-eth-abi.html#encodefunctioncall
                    chainId: CHAIN_ID, // ropsten
                },
            ],
        }).then(() => {
            window.alert('Ending this auction... Please refresh the page once the Metamask Transaction is confirmed.')
        });
    } else {
        console.log("Please install MetaMask!");
    }
};

export const highestBidder = async (contractAddress) => {
    const contract = new web3.eth.Contract(artifact.abi, contractAddress); // Need to put this into each function
    let highestBidderAddreses = await contract.methods.highestBidder().call({ from: myAddress });

    return highestBidderAddreses;
}

export const highestBid = async (contractAddress) => {
    const contract = new web3.eth.Contract(artifact.abi, contractAddress); // Need to put this into each function
    let highestBidValue = await contract.methods.highestBid().call({ from: myAddress });

    return highestBidValue;
}




