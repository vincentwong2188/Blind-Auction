# CZ4153 Blockchain Technology: DNS Blind Auction House

Welcome to the repository of the DNS Blind Auction House. 

This project is a collaboration between Shen Chen, Sim Zhi Qi, and Vincent Wong, and implements a Decentralized Domain Registrar that allows users on the Ethereum Blockchain Network to bid for unregistered '.ntu' domain names of their choice.

The Decentralized Domain Registrar, titled **'DNS Blind Auction House'**, allows users to bid for domain names using the 'commit-and-reveal' blind auction bidding process to interact with the blockchain, supporting features such as listing of registered domains, query the actual Ethereum public address (owner) behind the domain, bid for an unregistered domain, and many more features.

## Set Up

To use the DNS Blind Auction House, you will first need to clone the repository to your local computer. You may do so in your own desired local directory with the following command

```bash
git clone https://github.com/zhiqisim/Blind-Auction.git
```

We will be utilising the `Migrations.sol`, `Dns.sol` and `BlindAuction.sol` Solidity files for our smart contracts.

We can compile the contracts with the following command:

```bash
truffle compile
```

### Setting Up using the Ganache Environment

To set up with Ganache, first download Ganache [at this link](https://www.trufflesuite.com/ganache).

Next, start your Ganache application by double clicking the downloaded app image during installation.

Click on "New Workspace (Ethereum)", which will create a running instance of the Ethereum blockchain locally -- together with 10 accounts created, each with a balance of 100 ETH.

Next, we need to link the **DNS Blind Auction House** project with your local Ganache blockchain, by specifying a customized workspace name and the path to the file `truffle-config.js`.

![alt text](https://github.com/[username]/[reponame]/blob/[branch]/image.jpg?raw=true)




