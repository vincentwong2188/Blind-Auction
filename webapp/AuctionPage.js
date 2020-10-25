import React from "react";
import {
    updateDeposit,
    newDeposit,
    BankContractAddress,
    Testnet,
} from "./bank.js";

import {
    registerDomain,
    lookupAddress,
    bid,
    DnsContractAddress
} from "./dns.js"


// example from doc: https://reactjs.org/docs/forms.html#controlled-components
class AuctionPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            // queryInput: "",
            // depositInput: 0,
            // deposit: 0,
            address: "0x0",
            domainName: "",
            registering: false,
            searching: "no",
            searchedDomainName: "",
            domainNameOwner: "",
            bidInput: 0,

            mockItems: [
                {
                    domain: "aaa.ntu",
                    blockchainAddress: "0x1",
                },
                {
                    domain: "bbb.ntu",
                    blockchainAddress: "0x2",
                },
                {
                    domain: "ccc.ntu",
                    blockchainAddress: "0x3",
                },
                {
                    domain: "ddd.ntu",
                    blockchainAddress: "0x4",
                },
                {
                    domain: "eee.ntu",
                    blockchainAddress: "0x5",
                },
                {
                    domain: "fff.ntu",
                    blockchainAddress: "0x6",
                },
                {
                    domain: "ggg.ntu",
                    blockchainAddress: "0x7",
                },
                {
                    domain: "hhh.ntu",
                    blockchainAddress: "0x8",
                },
                {
                    domain: "iii.ntu",
                    blockchainAddress: "0x9",
                },
                {
                    domain: "jjj.ntu",
                    blockchainAddress: "0xA",
                },
                {
                    domain: "kkk.ntu",
                    blockchainAddress: "0xB",
                },
                {
                    domain: "lll.ntu",
                    blockchainAddress: "0xC",
                },
                {
                    domain: "mmm.ntu",
                    blockchainAddress: "0xD",
                },
                {
                    domain: "nnn.ntu",
                    blockchainAddress: "0xE",
                },
                {
                    domain: "ooo.ntu",
                    blockchainAddress: "0xF",
                },
                {
                    domain: "ppp.ntu",
                    blockchainAddress: "0x10",
                },
                {
                    domain: "qqq.ntu",
                    blockchainAddress: "0x11",
                },
                {
                    domain: "rrr.ntu",
                    blockchainAddress: "0x12",
                },
                {
                    domain: "sss.ntu",
                    blockchainAddress: "0x13",
                },
                {
                    domain: "ttt.ntu",
                    blockchainAddress: "0x14",
                },
                {
                    domain: "uuu.ntu",
                    blockchainAddress: "0x15",
                },
            ]

        };

        // this.handleQueryChange = this.handleQueryChange.bind(this);
        // this.handleQuery = this.handleQuery.bind(this);
        // this.handleDepositChange = this.handleDepositChange.bind(this);
        // this.handleNewDeposit = this.handleNewDeposit.bind(this);

    }
    // handleQueryChange = (e) => {

    //   this.setState({ queryInput: e.target.value });

    // };
    // handleQuery = async () => {

    //   let result = await updateDeposit(this.state.queryInput);
    //   this.setState({
    //     address: result.address,
    //     deposit: result.deposit,
    //   });
    // };

    // handleNewDeposit = async () => {

    //   await newDeposit(this.state.depositInput);

    // };

    // MY CODE

    handlePublicAddress = event => {
        this.setState({
            address: event.target.value
        })
    }

    handleDomainName = event => {
        this.setState({
            domainName: event.target.value
        })
    }

    handleDomainNameRegistration = async () => {

        this.setState({
            registering: true,
        })
        let result = await registerDomain(this.state.address);

        this.setState({
            address: result.address,
            registering: false,
        })
    }

    handleSearchedDomainName = event => {
        this.setState({
            searchedDomainName: event.target.value
        })
    }

    handleDomainNameLookup = async () => {
        this.setState({
            searching: "yes",
        })

        let result = await lookupAddress(this.state.searchedDomainName);
        this.setState({
            searching: "display",
            domainNameOwner: result.ownerAddress,
        })

    }

    handleBidInput = (e) => {
        this.setState({ bidInput: e.target.value });
    };

    handleBid = async () => {
        await bid(this.state.bidInput, this.state.domainName);
    }
    handleBack = () => {
        this.props.history.goBack();
    }

    componentDidMount() {
        const query = new URLSearchParams(this.props.location.search);
        let queryDomainName = ''
        for (let param of query.entries()) {
            queryDomainName = param[1];
        }
        this.setState({
            domainName: queryDomainName
        })
    }

    render() {

        const cardStyle = {
            fontFamily: "arial",
            width: "50%",
            margin: "16px auto",
            border: "1px solid #eee",
            boxShadow: "0 2px 3px #ccc",
            padding: "15px",
            textAlign: "center",
        };

        const innerCardStyle = {
            fontFamily: "arial",
            width: "50%",
            // margin: "16px auto",
            border: "1px solid #eee",
            boxShadow: "0 2px 3px #ccc",
            // padding: "5px",
            textAlign: "center",
        }

        const scroller = {
            margin: "0 auto",
            height: "200px",
            width: "100%",
            overflow: "auto"
        }

        return (
            <>
                <div style={cardStyle}>
                    <img style={{ width: "100px" }} src={require('./assets/house.png')} />


                    <h1 >Auction House</h1>
                    <p style={{ width: "45%", margin: "auto", fontSize: "18px", marginBottom: "20px" }} >
                        Welcome to the Auction House, powered by the <b>Ethereum</b> blockchain!
                        <br />
                        <br />
                        You have selected the domain <b>{this.state.domainName}</b>
                    </p>

                </div>
                <div style={cardStyle}>
                    <img style={{ height: "50px", width: "50px" }} src={require('./assets/ethereum.png')} />

                    <h3>Bid for A Domain!</h3>
                    <p style={{ width: "100%", margin: "auto", fontSize: "18px", marginBottom: "20px" }} >
                        Bid for your favourite domain names using a <b>"commit-and-reveal"</b> blind auction process.<br></br>
                    </p>


                    <input
                        style={{ width: "60%", margin: "5px" }}
                        type="text"
                        placeholder="Enter the domain name"
                        value={this.state.value}
                        onChange={this.handleDomainName}
                    />
                    <input
                        style={{ width: "60%", margin: "5px" }}
                        type="text"
                        placeholder="Enter bid amount (in Ether)"
                        value={this.state.value}
                        onChange={this.handleBidInput}
                    /><br></br>
                    <input style={{ margin: "5px" }} type="submit" value="Bid Ether" onClick={this.handleBid} />
                    <br />
                    <input style={{ margin: "5px" }} type="submit" value="Back to Home Page" onClick={this.handleBack} />

                </div>





            </>
        );
    }
}

export default AuctionPage;