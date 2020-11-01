import React from "react";

import {
    bid,
    biddingEnd,
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

            // State for keeping track of remaining time
            remainingTime: '',
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
        let real = null;
        if (this.state.real.toUpperCase() === 'TRUE') {
            real = true;
        } else if (this.state.real.toUpperCase() === 'FALSE') {
            real = false;
        } else {
            window.alert('Please either write "true" or "false" as your real input.')
            return;
        }

        let secret = this.state.secret;

        console.log("value: " + value);
        console.log("real: " + real);
        console.log("secret: " + secret);

        let contractAddress = this.props.contractAddress;
        console.log('before bid function')
        await bid(sendValue, value, real, secret, contractAddress);
        console.log('exits bid function')
    }

    async componentDidMount() {

        // Timer to show remaining time left for Bidding Stage
        let bidEndTime = await biddingEnd(this.props.contractAddress);

        setInterval(() => {
            this.setState({
                remainingTime: bidEndTime - (Math.floor(Date.now() / 1000))
            })
        }, 1000)
    }

    render() {

        const innerCardStyle = {
            fontFamily: "arial",
            padding: "15px",
            border: "1px solid #eee",
            boxShadow: "0 2px 3px #ccc",
            textAlign: "center",
        }


        return (
            <div style={{
                fontFamily: "arial",
                width: "82%",
                margin: "auto",
                display: "flex",
                flexDirection: "row"
            }}>
                <div style={{ ...innerCardStyle, flex: 2, marginRight: "16px" }} >
                    <p style={{ width: "100%", margin: "auto", fontSize: "18px", marginBottom: "20px" }} >
                        This auction is currently in the <b>Bidding Stage</b> and is still accepting bids!<br /><br />
                    Submit a bid below to participate in this auction.
                    </p>
                    <br />
                    <b>ETH Amount:</b>
                    <input
                        style={{ height: "50px", width: "80px", margin: "5px", fontSize: "30px" }}
                        type="text"
                        placeholder=""
                        // value={this.state.bidValue}
                        onChange={this.handleBidSend}
                    /><br /><br />
                    <b></b><br />
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
                        onChange={this.handleSecret}
                    /><br />
                    <input style={{ margin: "5px" }} type="submit" value="Place Bid" onClick={this.handlePlaceBid} />
                    <br /><br />

                    <b>Remaining Time Left for Bidding Stage:</b><br />
                    {
                        this.state.remainingTime === ''
                            ? 'Loading time left...'
                            : this.state.remainingTime < 0
                                ? `Bidding Stage has concluded! Please refresh the page.`
                                : this.state.remainingTime > 60
                                    ? `${Math.floor(this.state.remainingTime / 60)} min ${this.state.remainingTime - (Math.floor(this.state.remainingTime / 60)) * 60} sec`
                                    : `${this.state.remainingTime} sec`
                    }

                </div>

                <div style={{ ...innerCardStyle, flex: 1 }}>
                    <img style={{ width: "50px" }} src={require('../../assets/question.png')} />
                    <h3>How do I participate in the <br />Bidding Phase?</h3>

                    <p>
                        Each bidding stage allows a bidder (you!) to place bids for a particular domain name. To bid, please input in your actual bid (in ether units).
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                        <br /><br />Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                    </p>
                </div>

            </div >);
    }
}
export default BiddingStage;