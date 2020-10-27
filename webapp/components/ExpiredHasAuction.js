import React from "react";

import {
    startAuction,
} from "../dns.js"

class ExpiredHasAuction extends React.Component {

    constructor(props) {
        super(props);
        this.state = {

            // States for handling status check:
            bidValue: 0,
        };

    }

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

                <h1 >{this.props.domainName} has an existing ongoing auction!</h1>
                <p style={{ width: "45%", margin: "auto", fontSize: "18px", marginBottom: "20px" }} >
                    Submit a bid below to participate in this auction.
                </p>
                <br />
                <input
                    style={{ width: "30%", margin: "5px" }}
                    type="text"
                    placeholder="Enter your bid (in ETH)"
                    // value={this.state.bidValue}
                    onChange={this.props.bidChange}
                /><br />
                <input
                    style={{ width: "30%", margin: "5px" }}
                    type="text"
                    placeholder="Is this bid real? Write 'True' if real, and 'False' if fake. "
                    // value={this.state.bidValue}
                    onChange={this.props.bidReal}
                /><br />
                <input
                    style={{ width: "30%", margin: "5px" }}
                    type="text"
                    placeholder="Enter a secret password"
                    // value={this.state.bidValue}
                    onChange={this.props.bidSecret}
                /><br />
                <input style={{ margin: "5px" }} type="submit" value="Place Bid" onClick={this.props.placeBid} />


            </div>
        );
    }
}

export default ExpiredHasAuction;