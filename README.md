# CZ4153 Blockchain Technology: DNS Blind Auction House

Welcome to the repository of the DNS Blind Auction House. 

This project is a collaboration between Shen Chen, Sim Zhi Qi, and Vincent Wong, and implements a Decentralized Domain Registrar that allows users on the Ethereum Blockchain Network to bid for unregistered domain names of their choice.

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

We should now see a new folder named `build/contracts`, which contain `BlindAuction.json`, `Dns.json`, and `Migrations.json`.

### 1. Setting Up using the Ganache Environment

To set up with Ganache, first download Ganache [at this link](https://www.trufflesuite.com/ganache).

Next, start your Ganache application by double clicking the downloaded app image during installation.

Click on "New Workspace (Ethereum)", which will create a running instance of the Ethereum blockchain locally -- together with 10 accounts created, each with a balance of 100 ETH.

Next, we need to link the **DNS Blind Auction House** project with your local Ganache blockchain, by specifying a customized workspace name and the path to the file `truffle-config.js`.

![Ganache Workspace Settings](https://github.com/zhiqisim/Blind-Auction/blob/master/assets/ganache.jpeg)

Once inputted successfully, click on "Add Project" to link and save the project in Ganache.

Now, we can deploy our contracts. We do so with the following command:

```bash
truffle migrate --reset
```

During the migration, take note of the contract address obtained after deploying the Dns Solidity contract, as highlighted below.

![DNS Migration Contract Address](https://github.com/zhiqisim/Blind-Auction/blob/master/assets/dns%20migrations.jpeg)

Navigate into the `./configurations.js` file. Make the following 2 changes:

1. Change the address in the constant 'DnsContractAddressGanache' to the value highlighted above.
2. Change the ENVIRONMENT constant to `'Ganache'`.

### 2. Setting up with Ropsten Test Net

Lorem Ipsum

## Front End Web Application Set Up

Navigate into the `/webapp` folder.

Execute the following commands to initialise the React Web Application.

```bash
npm install
```

Once that is done, we can run the web application on `localhost:1234` using the following command:

```bash
npm start
```




