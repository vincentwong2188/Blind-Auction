import React from "react";

import {
    startAuction,
    getAuctionURL,
} from "../dns.js"

class ExpiredNoAuction extends React.Component {

    render() {

        const cardStyle = {
            fontFamily: "arial",
            width: "80%",
            margin: "16px auto",
            border: "1px solid #eee",
            boxShadow: "0 2px 3px #ccc",
            padding: "15px",
            textAlign: "center",
        };

        return (
            <div style={cardStyle}>
                <img style={{ width: "100px" }} src={require('../assets/checked.png')} />

                <h1 >{this.props.domainName} is available for Auction!</h1>
                <p style={{ width: "45%", margin: "auto", fontSize: "18px", marginBottom: "20px" }} >
                    <b>Great news!</b><br /><br />This domain name is currently not owned by anyone in the Ethereum Network, and is thus available for auction.
                    <br />
                    Click below to start an auction for this domain name.
                </p>
                <br />
                {/* <input
                    style={{ width: "30%", margin: "5px" }}
                    type="text"
                    placeholder="Enter your bid (in ETH)"
                    // value={this.state.bidValue}
                    onChange={this.props.bidChange}
                /> */}
                <br />
                <input style={{ margin: "5px" }} type="submit" value="Start Auction" onClick={this.props.startAuction} />


            </div>
        );
    }
}

export default ExpiredNoAuction;