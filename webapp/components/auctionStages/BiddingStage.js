import React from "react";

import {
    bid,
} from "../../blindAuction"

class BiddingStage extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            // States for inputs into bid() function of BlindAuction contract
            bidSend: '',
            bidInput: '',
            real: '',
            secret: '',
        };
    }

    // Handle Submiting of Bid from ExpiredHasAuction
    handleBidSend = event => {
        this.setState({
            bidSend: event.target.value,
        })
    }

    handleBid = event => {
        this.setState({
            bidInput: event.target.value,
        })
    }
    handleReal = event => {
        this.setState({
            real: event.target.value,
        })
    }
    handleSecret = event => {
        this.setState({
            secret: event.target.value,
        })
    }

    handlePlaceBid = async () => {
        let sendValue = this.state.bidSend;
        let value = this.state.bidInput;
        let real = this.state.real;
        let secret = this.state.secret;
        let contractAddress = this.props.contractAddress;
        await bid(sendValue, value, real, secret, contractAddress);

    }

    render() {
        return (
            <div>
                <p style={{ width: "60%", margin: "auto", fontSize: "18px", marginBottom: "20px" }} >
                    This auction is currently in the <b>Bidding Stage</b> and is still accepting bids!<br />
                    Submit a bid below to participate in this auction.
                </p>
                <br />
                ETH Amount:
                <input
                    style={{ height: "50px", width: "80px", margin: "5px", fontSize: "30px" }}
                    type="text"
                    placeholder=""
                    // value={this.state.bidValue}
                    onChange={this.handleBidSend}
                /><br /><br />
                Hash Values:<br />
                <input
                    style={{ width: "20%", margin: "5px" }}
                    type="text"
                    placeholder="Enter the bid"
                    // value={this.state.bidValue}
                    onChange={this.handleBid}
                /><br />
                <input
                    style={{ width: "20%", margin: "5px" }}
                    type="text"
                    placeholder="Is this bid real? Write 'True' if real, and 'False' if fake. "
                    // value={this.state.bidValue}
                    onChange={this.handleReal}
                /><br />
                <input
                    style={{ width: "20%", margin: "5px" }}
                    type="text"
                    placeholder="Enter a secret password"
                    // value={this.state.bidValue}
                    onChange={this.handleReal}
                /><br />
                <input style={{ margin: "5px" }} type="submit" value="Place Bid" onClick={this.handlePlaceBid} />

            </div>);
    }
}
export default BiddingStage;