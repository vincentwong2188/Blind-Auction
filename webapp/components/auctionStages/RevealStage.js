import React from "react";

import {
    reveal,
    revealEnd,
} from "../../blindAuction";


const { soliditySha3, toWei, fromAscii } = require("web3-utils");


class RevealStage extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            // States for inputs into reveal() function of BlindAuction contract
            bids: '',
            reals: '',
            secrets: '',

            // State for keeping track of remaining time
            remainingTime: '',

        };
    }

    handleBids = event => {
        this.setState({
            bids: event.target.value,
        })
    }

    handleReals = event => {
        this.setState({
            reals: event.target.value,
        })
    }

    handleSecrets = event => {
        this.setState({
            secrets: event.target.value
        })
    }

    revealBids = async () => {

        // Convert strings of bids, reals, and secrets, into list form
        let bidsArray = this.state.bids.split(',');
        bidsArray = bidsArray.map(element => toWei(element.trim()));

        let realArray = this.state.reals.split(',');
        let error = false;
        realArray = realArray.map(element => {
            if (element.trim().toUpperCase() === 'TRUE') {
                return true;
            } else if (element.trim().toUpperCase() === 'FALSE') {
                return false;
            } else {
                window.alert('Please either write "true" or "false" as your real input.');
                error = true;
                return element;
            }
        });

        if (error) {
            return;
        }

        let secretsArray = this.state.secrets.split(',');
        secretsArray = secretsArray.map(element => fromAscii(element.trim()));

        console.log(bidsArray)
        console.log(realArray)
        console.log(secretsArray)

        await reveal(bidsArray, realArray, secretsArray, this.props.contractAddress);

    }

    async componentDidMount() {
        // Timer for remaining time left for Reveal Stage
        let revealEndTime = await revealEnd(this.props.contractAddress);

        setInterval(() => {
            this.setState({
                remainingTime: revealEndTime - (Math.floor(Date.now() / 1000))
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

        return (<div style={{
            fontFamily: "arial",
            width: "82%",
            margin: "auto",
            display: "flex",
            flexDirection: "row"
        }}>
            <div style={{ ...innerCardStyle, flex: 2, marginRight: "16px" }}>
                <p style={{ width: "60%", margin: "auto", fontSize: "18px", marginBottom: "20px" }} >
                    This auction is currently in the <b>Reveal Stage</b>, as its Bidding Stage has already concluded.
                    <br /><br />Only participants that have bidded before will be allowed to participate to reveal their bids.
                    <br /><br />Reveal your bid below to be eligible to either win the auction or have your bids refunded due to a loss.
                </p>
                <br />

                Hash Values:<br />
                <input
                    style={{ width: "40%", margin: "5px" }}
                    type="text"
                    placeholder="Enter all your bids in order, separated with a comma ','"
                    // value={this.state.bidValue}
                    onChange={this.handleBids}
                /><br />
                <input
                    style={{ width: "40%", margin: "5px" }}
                    type="text"
                    placeholder="Enter all your True/False values, separated with a comma ','"
                    // value={this.state.bidValue}
                    onChange={this.handleReals}
                /><br />
                <input
                    style={{ width: "40%", margin: "5px" }}
                    type="text"
                    placeholder="Enter all your secret passwords in order, separated with a comma ','"
                    // value={this.state.bidValue}
                    onChange={this.handleSecrets}
                /><br />
                <input style={{ margin: "5px" }} type="submit" value="Reveal" onClick={this.revealBids} />
                <br /><br /><b>Remaining Time Left for Bidding Stage:</b><br />
                {this.state.remainingTime === ''
                    ? 'Loading time left...'
                    : this.state.remainingTime < 0
                        ? `Reveal Stage has concluded! Please refresh the page.`
                        : this.state.remainingTime > 60
                            ? `${Math.floor(this.state.remainingTime / 60)} min ${this.state.remainingTime - (Math.floor(this.state.remainingTime / 60)) * 60} sec`
                            : `${this.state.remainingTime} sec`}
            </div>

            <div style={{ ...innerCardStyle, flex: 1 }}>
                <img style={{ width: "50px" }} src={require('../../assets/question.png')} />

                <h3>How do I participate in the <br />Reveal Phase?</h3>
                <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                        <br /><br />Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                    </p>
            </div>


        </div >);
    }
}
export default RevealStage;