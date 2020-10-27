import React from "react";

class EndStage extends React.Component {
    render() {
        return (<div>
            <p style={{ width: "60%", margin: "auto", fontSize: "18px", marginBottom: "20px" }} >
                This auction is currently in the <b>End Stage</b>, as both its Bidding and Reveal Stages have already concluded.
                <br /><br />
                The winner of the bid is XXXX.
                <br /><br />
                Please click the <b>"End Auction"</b> button below to claim your domain ownership.
            </p>
            <br />
            <input style={{ margin: "5px" }} type="submit" value="End Auction" onClick={this.props.placeBid} />

        </div>);
    }
}
export default EndStage;