import React from "react";

import {
    reveal,
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
        bidsArray = bidsArray.map(element => toWei(element));

        let realArray = this.state.reals.split(',');
        let error = false;
        realArray = realArray.map(element => {
            if (element.toUpperCase() === 'TRUE') {
                return true;
            } else if (element.toUpperCase() === 'FALSE') {
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
        secretsArray = secretsArray.map(element => fromAscii(element));

        await reveal(bidsArray, realArray, secretsArray, this.props.contractAddress);

    }

    render() {
        return (<div>
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
                onChange={this.props.bidSecret}
            /><br />
            <input style={{ margin: "5px" }} type="submit" value="Reveal" onClick={this.revealBids} />

        </div>);
    }
}
export default RevealStage;