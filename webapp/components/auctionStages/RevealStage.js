import React from "react";

class RevealStage extends React.Component {

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
                onChange={this.props.bidChange}
            /><br />
            <input
                style={{ width: "40%", margin: "5px" }}
                type="text"
                placeholder="Enter all your True/False values, separated with a comma ','"
                // value={this.state.bidValue}
                onChange={this.props.bidReal}
            /><br />
            <input
                style={{ width: "40%", margin: "5px" }}
                type="text"
                placeholder="Enter all your secret passwords in order, separated with a comma ','"
                // value={this.state.bidValue}
                onChange={this.props.bidSecret}
            /><br />
            <input style={{ margin: "5px" }} type="submit" value="Place Bid" onClick={this.props.placeBid} />

        </div>);
    }
}
export default RevealStage;