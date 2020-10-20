import { useState, useRef, useEffect } from "react";
import detectEthereumProvider from "@metamask/detect-provider";
// NOTE: be aware of this: https://flaviocopes.com/parcel-regeneratorruntime-not-defined/
import Web3 from "web3";

// importing a compiled contract artifact which contains function signature etc. to interact
import artifact from "../build/contracts/Bank.json";

const myAddress = "0x612f3f3bc105eb95b14Af4A93D9788cC888E6054"; // PLEASE CHANGE IT TO YOURS (changed)
const infuraWSS = `wss://ropsten.infura.io/ws/v3/58dd641dd5c54a49b9418a8e2e4e17c5`; // PLEASE CHANGE IT TO YOURS (changed)

export const BankContractAddress = "0x10892DdB2Ecd5aaF60e94Aa5c6e52683F7B5bB5d"; // PLEASE CHANGE IT TO YOURS (changed)
export const Testnet = "ropsten"; // PLEASE CHANGE IT TO YOURS (changed)

// export const BankContractAddress = "0xE687e6A5ee9c95e3398f65b12676aDe3EA318192"; // PLEASE CHANGE IT TO YOURS (changed)
// export const Testnet = "ganache"; // PLEASE CHANGE IT TO YOURS (changed)

const web3 = new Web3(
  Web3.currentProvider || new Web3.providers.WebsocketProvider(infuraWSS)
);
// doc here: https://web3js.readthedocs.io/en/v1.2.11/web3.html#providers
const contract = new web3.eth.Contract(artifact.abi, BankContractAddress);

export const updateDeposit = async (addr) => {

  // doc here: https://web3js.readthedocs.io/en/v1.2.11/web3-eth-contract.html#methods-mymethod-call
  const newBalance = await contract.methods.balance().call({ from: addr });
  const etherBalance = web3.utils.fromWei(newBalance, 'ether')
  return { address: addr, deposit: etherBalance };
};

export const newDeposit = async (amount) => {
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
          to: BankContractAddress,
          value: web3.utils.toWei(amount),
          data: web3.eth.abi.encodeFunctionCall(
            {
              name: "deposit",
              type: "function",
              inputs: [],
            },
            []
          ), // https://web3js.readthedocs.io/en/v1.2.11/web3-eth-abi.html#encodefunctioncall
          chainId: 3, // ropsten
        },
      ],
    });
  } else {
    console.log("Please install MetaMask!");
  }
};