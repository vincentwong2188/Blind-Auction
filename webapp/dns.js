import { useState, useRef, useEffect } from "react";
import detectEthereumProvider from "@metamask/detect-provider";
import Web3 from "web3";
import artifact from "../build/contracts/Dns.json";

const myAddress = "0x612f3f3bc105eb95b14Af4A93D9788cC888E6054";

const ENVIRONMENT = "Ropsten" // Switch between 'Ganache' Local Env, 'Ropsten' Testnet, or 'Goerli' Testnet

// export const DnsContractAddress = "0xA59960d719799a9D45566f5b068EfB2a75F06611"; // GANACHE
export const DnsContractAddress = "0x7825c086c793BA87D7C12F3FA843FB8F93A2b755"; // ROPSTEN
const infuraWSSRopsten = `wss://ropsten.infura.io/ws/v3/58dd641dd5c54a49b9418a8e2e4e17c5`;
const infuraWSSGoerli = `wss://goerli.infura.io/ws/v3/58dd641dd5c54a49b9418a8e2e4e17c5`;

// run $ truffle migrate --network ropsten --reset

// for GANACHE
// const web3 = new Web3(Web3.currentProvider || new Web3.providers.HttpProvider("http://localhost:7545"))
// export const DnsContractAddress = "0xA59960d719799a9D45566f5b068EfB2a75F06611"; // GANACHE

// FOR ROPSTEN
// const infuraWSS = `wss://ropsten.infura.io/ws/v3/58dd641dd5c54a49b9418a8e2e4e17c5`; // PLEASE CHANGE IT TO YOURS (changed)
// const CHAIN_ID = 3;
// const web3 = new Web3(
//     Web3.currentProvider || new Web3.providers.WebsocketProvider(infuraWSS)
// );
// export const Testnet = "ropsten"; // PLEASE CHANGE IT TO YOURS (changed)
// export const DnsContractAddress = "0x9C0ddaeAe254F751b91B00dFdD11C924C48aDBbb"; // ROPSTEN

// FOR GOERLI
// const infuraWSS = `wss://goerli.infura.io/ws/v3/58dd641dd5c54a49b9418a8e2e4e17c5`; // PLEASE CHANGE IT TO YOURS (changed)
// const CHAIN_ID = 5;
// const web3 = new Web3(
//     Web3.currentProvider || new Web3.providers.WebsocketProvider(infuraWSS)
// );
// export const Testnet = "goerli"; // PLEASE CHANGE IT TO YOURS (changed)
// export const DnsContractAddress = "0x1674e1cC98D8E9d8e31f411f3A81400880dCaDfB"; // GOERLI


// Checking Environment
const web3 = ENVIRONMENT.toUpperCase() === 'GANACHE'
    ? new Web3(Web3.currentProvider || new Web3.providers.HttpProvider("http://localhost:7545"))
    : ENVIRONMENT.toUpperCase() === 'ROPSTEN'
        ? new Web3(
            Web3.currentProvider || new Web3.providers.WebsocketProvider(infuraWSSRopsten))
        :
        ENVIRONMENT.toUpperCase() === 'GOERLI'
            ? new Web3(
                Web3.currentProvider || new Web3.providers.WebsocketProvider(infuraWSSGoerli))
            : ''

const contract = new web3.eth.Contract(artifact.abi, DnsContractAddress);

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

    const CHAIN_ID = ENVIRONMENT.toUpperCase() === 'GANACHE'
        ? await web3.eth.getChainId()
        : ENVIRONMENT.toUpperCase() === 'ROPSTEN'
            ? 3
            : ENVIRONMENT.toUpperCase() === 'GOERLI' ? 5
                : ''

    const provider = await detectEthereumProvider();
    if (provider) {

        ethereum.request({
            method: "eth_sendTransaction",
            params: [
                {
                    from: ethereum.selectedAddress,
                    to: ownerAddress,
                    value: parseInt(web3.utils.toWei(amount)).toString(16),
                    gas: web3.utils.toHex(3000000),
                    gasPrice: web3.utils.toHex(20000000000),
                    data: null,
                    chainId: CHAIN_ID,
                },
            ],
        });
    } else {
        window.alert("Please install MetaMask!");
        console.log("Please install MetaMask!");
    }
}

export const checkExpired = async (url) => {
    const result = await contract.methods.checkExpired(url).call({ from: myAddress });
    return { expired: result }
}

export const getExpired = async (url) => {
    const result = await contract.methods.getExpired(url).call({ from: myAddress });
    return result;
}

export const testFuncParam = async (number) => {
    const result = await contract.methods.testFuncParam(number).call({ from: myAddress });
    return { value: result }
}

export const testFunc = async () => {
    const result = await contract.methods.testFunc().call({ from: myAddress });
    return { name: result }
}

export const testRegisterFunc = async (url, address) => {

    const CHAIN_ID = ENVIRONMENT.toUpperCase() === 'GANACHE'
        ? await web3.eth.getChainId()
        : ENVIRONMENT.toUpperCase() === 'ROPSTEN'
            ? 3
            : ENVIRONMENT.toUpperCase() === 'GOERLI' ? 5
                : ''

    const provider = await detectEthereumProvider();
    if (provider) {

        ethereum.request({
            method: "eth_sendTransaction",
            params: [
                {
                    from: ethereum.selectedAddress,
                    to: DnsContractAddress,
                    value: parseInt(web3.utils.toWei('0', 'ether')).toString(16),
                    gas: web3.utils.toHex(1000000),
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
                                    type: 'address',
                                    name: 'address'
                                }
                            ],
                        },
                        [url, address]
                    ),
                    chainId: CHAIN_ID,
                },
            ],
        });
    } else {
        window.alert("Please install MetaMask!");
        console.log("Please install MetaMask!");
    }

}

export const getAuctionURL = async (url) => {
    const result = await contract.methods.getAuctionURL(url).call({ from: myAddress });
    return { auctionAddress: result }
}

export const startAuction = async (domainURL) => {

    const CHAIN_ID = ENVIRONMENT.toUpperCase() === 'GANACHE'
        ? await web3.eth.getChainId()
        : ENVIRONMENT.toUpperCase() === 'ROPSTEN'
            ? 3
            : ENVIRONMENT.toUpperCase() === 'GOERLI' ? 5
                : ''

    const provider = await detectEthereumProvider();
    if (provider) {

        ethereum.request({
            method: "eth_sendTransaction",
            params: [
                {
                    from: ethereum.selectedAddress,
                    to: DnsContractAddress,
                    value: parseInt(web3.utils.toWei('0', 'ether')).toString(16),
                    gas: web3.utils.toHex(3000000),
                    gasPrice: web3.utils.toHex(20000000000),

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
                    ),
                    chainId: CHAIN_ID,
                },
            ],
        }).then(result => {
            window.alert("A new auction is now being created. Please refresh the page once the Metamask Transaction is confirmed.");
        });
    } else {
        console.log("Please install MetaMask!");
    }
}




