import { useState, useRef, useEffect } from "react";
import detectEthereumProvider from "@metamask/detect-provider";
// NOTE: be aware of this: https://flaviocopes.com/parcel-regeneratorruntime-not-defined/
import Web3 from "web3";

// importing a compiled contract artifact which contains function signature etc. to interact
import artifact from "../build/contracts/Dns.json"; // REMEMBER TO CHANGE THIS!!!

const myAddress = "0x612f3f3bc105eb95b14Af4A93D9788cC888E6054"; // MAY NEED TO FILL UP
const infuraWSS = `wss://ropsten.infura.io/ws/v3/58dd641dd5c54a49b9418a8e2e4e17c5`; // PLEASE CHANGE IT TO YOURS (changed)

// run $ truffle migrate --network ropsten --reset
export const DnsContractAddress = "0x63308b22837D8Af4CD1cF0e44b58DeFFb585a37E"; // FILLED UP!!
export const Testnet = "ropsten"; // PLEASE CHANGE IT TO YOURS (changed)

const web3 = new Web3(
    Web3.currentProvider || new Web3.providers.WebsocketProvider(infuraWSS)
);
// doc here: https://web3js.readthedocs.io/en/v1.2.11/web3.html#providers
const contract = new web3.eth.Contract(artifact.abi, DnsContractAddress); // MUST CHANGE ARTIFACT


export const lookupAddress = async (addr) => {
    // doc here: https://web3js.readthedocs.io/en/v1.2.11/web3-eth-contract.html#methods-mymethod-call
    const result = await contract.methods.getRegisteredURL(addr).call({ from: myAddress });
    return { ownerAddress: result };
};

export const getAddressList = async () => {
    const result = await contract.methods.getAddresses().call({ from: myAddress });
    return { addressList: result }
}

export const getURLCount = async (addr) => {
    const result = await contract.methods.getURLCount(addr).call({ from: myAddress });
    return { count: result }
}

export const getURL = async (addr, idx) => {
    const result = await contract.methods.getURL(addr, idx).call({ from: myAddress });
    return { domainName: result }
}

export const sendETH = async (amount, ownerAddress) => {
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
                    to: ownerAddress,
                    value: web3.utils.toWei(amount),
                    gas: web3.utils.toHex(46899),
                    gasPrice: web3.utils.toHex(15000),
                    data: null,
                    chainId: 3, // ropsten
                },
            ],
        });
    } else {
        window.alert("Please install MetaMask!");
        // console.log("Please install MetaMask!");
    }
}

export const checkExpired = async (url) => {
    const result = await contract.methods.checkExpired(url).call({ from: myAddress });
    return { expired: result }
}

// TEST FUNCTIONS

export const testFuncParam = async (number) => {
    const result = await contract.methods.testFuncParam(number).call({ from: myAddress });
    return { value: result }
}

export const testFunc = async () => {
    const result = await contract.methods.testFunc().call({ from: myAddress });
    return { name: result }
}

export const testRegisterFunc = async (url, address) => {
    console.log("Enters testRegisterFunc");
    const provider = await detectEthereumProvider();
    if (provider) {
        // From now on, this should always be true:
        // provider === window.ethereum
        ethereum.request({
            method: "eth_sendTransaction",
            params: [
                {
                    from: ethereum.selectedAddress,
                    to: DnsContractAddress,
                    value: web3.utils.toWei(0, 'ether'),
                    gas: web3.utils.toHex(46899),
                    gasPrice: web3.utils.toHex(15000),

                    data: web3.eth.abi.encodeFunctionCall(
                        {
                            name: "testRegisterFunc",
                            type: "function",
                            inputs: [
                                {
                                    type: 'string',
                                    name: 'url'
                                },
                                {
                                    type: 'string',
                                    name: 'address'
                                }
                            ],
                        },
                        [url, address]
                    ), // https://web3js.readthedocs.io/en/v1.2.11/web3-eth-abi.html#encodefunctioncall
                    chainId: 3, // ropsten
                },
            ],
        });
    } else {
        console.log("Please install MetaMask!");
    }
}

// END


export const getAuctionURL = async (url) => {
    const result = await contract.methods.getAuctionURL(url).call({ from: myAddress });
    return { auctionAddress: result }
}

export const startAuction = async (domainURL) => {
    const provider = await detectEthereumProvider();
    if (provider) {
        // From now on, this should always be true:
        // provider === window.ethereum
        ethereum.request({
            method: "eth_sendTransaction",
            params: [
                {
                    from: ethereum.selectedAddress,
                    to: DnsContractAddress,
                    value: web3.utils.toWei(amount, 'ether'),
                    gas: web3.utils.toHex(46899),
                    gasPrice: web3.utils.toHex(15000),

                    data: web3.eth.abi.encodeFunctionCall(
                        {
                            name: "startAuction",
                            type: "function",
                            inputs: [
                                {
                                    type: 'string',
                                    name: 'domainURL'
                                }
                            ],
                        },
                        [domainURL]
                    ), // https://web3js.readthedocs.io/en/v1.2.11/web3-eth-abi.html#encodefunctioncall
                    chainId: 3, // ropsten
                },
            ],
        });
    } else {
        console.log("Please install MetaMask!");
    }
}

export const bid = async (amount, domainURL) => {
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
                    to: DnsContractAddress,
                    value: web3.utils.toWei(amount, 'ether'),
                    gas: web3.utils.toHex(46899),
                    gasPrice: web3.utils.toHex(15000),

                    data: web3.eth.abi.encodeFunctionCall(
                        {
                            name: "deposit",
                            type: "function",
                            inputs: [
                                {
                                    type: 'string',
                                    name: 'domainURL'
                                }
                            ],
                        },
                        [domainURL]
                    ), // https://web3js.readthedocs.io/en/v1.2.11/web3-eth-abi.html#encodefunctioncall
                    chainId: 3, // ropsten
                },
            ],
        });
    } else {
        console.log("Please install MetaMask!");
    }
};



