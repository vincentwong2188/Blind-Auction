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
class HomePage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

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

    enterAuctionHouse = () => {

        if (this.state.domainName === "") {
            window.alert("Please input a domain name!");
        } else if (!this.state.domainName.includes('.')) {
            window.alert("Please input a valid domain name!");
        } else {
            const queryString = "domainName=" + encodeURIComponent(this.state.domainName);

            this.props.history.push({
                pathname: '/auction',
                search: '?' + queryString
            });
        }
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
                    <img style={{ width: "100px" }} src={require('./assets/auction.png')} />

                    <h1 >DNS Auction House</h1>
                    <p style={{ width: "45%", margin: "auto", fontSize: "18px", marginBottom: "20px" }} >Your one-stop registrar service to bid for domain names, using the <b>Ethereum</b> blockchain!</p>

                </div>

                <div style={cardStyle}>
                    <img style={{ height: "50px", width: "50px" }} src={require('./assets/house.png')} />

                    <h2>Enter the Auction House</h2>
                    <p style={{ width: "60%", margin: "auto", fontSize: "15px", marginBottom: "20px" }} >
                        Looking to own a new domain name?
                        <br></br>
                        Want to check on the status of an existing auction?
                        <br></br>
                        <br></br>
                        Enter the Auction House to create or manage your existing auctions.
                        <br></br>
                    </p>

                    <input
                        style={{ width: "40%", margin: "5px" }}
                        type="text"
                        placeholder="Please input your domain name"
                        value={this.state.value}
                        onChange={this.handleDomainName}
                    />
                    <br></br>
                    <input style={{ margin: "5px" }} type="submit" value="Enter the Auction House" onClick={this.enterAuctionHouse} />

                </div>

                <div style={{
                    fontFamily: "arial",
                    width: "51.5%",
                    margin: "auto",
                    display: "flex",
                    flexDirection: "row"
                }}>
                    <div style={innerCardStyle}>
                        <img style={{ height: "50px", width: "50px", marginTop: "15px" }} src={require('./assets/ethereum.png')} />
                        <h3>Lookup the Owner of a Domain</h3>

                        <input
                            style={{ width: "60%", margin: "5px" }}
                            type="text"
                            placeholder="Enter the domain name"
                            value={this.state.value}
                            onChange={this.handleDomainName}
                        />{" "}<br></br>
                        <input style={{ margin: "5px" }} type="submit" value="Search!" onClick={this.handleDomainNameLookup} />
                        <p>
                            {this.state.searching === "yes"
                                ? "Searching for owner of domain, please wait..."
                                : (this.state.searching === "no"
                                    ? "Ready!"
                                    : this.state.searchedDomainName + "belongs to address " + this.state.ownerAddress)}
                        </p>
                    </div>

                    <div style={innerCardStyle}>
                        <img style={{ height: "50px", width: "50px", marginTop: "15px" }} src={require('./assets/ethereum.png')} />
                        <h3>Register for a Domain</h3>
                        <input
                            style={{ width: "60%", margin: "5px" }}
                            type="text"
                            placeholder="Enter your Public Address "
                            value={this.state.value}
                            onChange={this.handlePublicAddress}
                        /><br></br>
                        <input
                            style={{ width: "60%", margin: "5px" }}
                            type="text"
                            placeholder="Enter your chosen domain name "
                            value={this.state.value}
                            onChange={this.handleDomainName}
                        />{" "}<br></br>
                        <input style={{ margin: "5px" }} type="submit" value="Register Domain Name" onClick={this.handleDomainNameRegistration} />
                        <p>
                            {this.state.registering ? "Registering Domain, please wait..." : "Ready!"}
                        </p>
                    </div>



                </div>

                <div style={cardStyle}>
                    <h3>List of Registered Domains</h3>

                    <input
                        style={{ width: "80%", margin: "5px" }}
                        type="text"
                        placeholder="Enter the domain name"
                        value={this.state.value}
                        onChange={this.handleDomainName}
                    />{" "}
                    <input style={{ margin: "5px" }} type="submit" value="Search!" onClick={this.handleDomainNameLookup} />

                    <div style={scroller}>
                        <table style={{
                            borderCollapse: "collapse",
                            border: "2px solid rgb(200, 200, 200)",
                            letterSpacing: "1px",
                            // fontSize: ".8rem"
                            width: "100%"
                        }}>
                            <thead style={{ backgroundColor: "#e4f0f5" }}>
                                <tr>
                                    <th style={{
                                        border: "1px solid rgb(190, 190, 190)",
                                        padding: "5px 10px",
                                    }} scope="col" >Domain Name</th>
                                    <th scope="col">Blockchain Address</th>
                                </tr>
                            </thead>

                            <tbody>

                                {this.state.mockItems.map((element) => {
                                    return (
                                        <tr>
                                            <th style={{
                                                border: "1px solid rgb(190, 190, 190)",
                                                padding: "5px 10px",
                                            }} scope="row">{element.domain}</th>
                                            <td style={{
                                                border: "1px solid rgb(190, 190, 190)",
                                                padding: "5px 10px", textAlign: "center"
                                            }}>{element.blockchainAddress}</td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>
                </div>



            </>
        );
    }
}

export default HomePage;