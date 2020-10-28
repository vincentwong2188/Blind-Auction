import React from "react";
import {
    auctionEnd,
    highestBidder,
    highestBid
} from "../../blindAuction"

class EndStage extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            // States for inputs into reveal() function of BlindAuction contract
            highestBidderAddress: '(loading...)',
            highestBidValue: '',
            clicked: false,

        };
    }

    endAuction = async () => {
        await auctionEnd(this.props.contractAddress);
    }

    showAlert = () => {
        window.alert('Ending this auction... Please refresh the page once the Metamask Transaction is confirmed.')
    }

    componentDidMount() {
        const getHighestBidder = async () => {
            let highestBidderAddress = await highestBidder(this.props.contractAddress);
            let highestBidValue = await highestBid(this.props.contractAddress);
            console.log('highestBidderAddress ' + highestBidderAddress)
            console.log('highestBidValue ' + highestBidValue)

            this.setState({
                highestBidderAddress: highestBidderAddress,
                highestBidValue: highestBidValue,
            })

        }
        getHighestBidder();
    }

    render() {
        let button = <input style={{ margin: "5px" }} type="submit" value="End Auction" onClick={this.endAuction} />;

        if (this.state.clicked) {
            button = <input style={{ margin: "5px" }} type="submit" value="Ending Auction..." onClick={null} />

        }

        let winningText = "Loading winner information..."
        if (this.state.highestBidderAddress === "0x0000000000000000000000000000000000000000") {
            winningText = `This auction had no bidders, and thus, no one won the auction.`
        }
        else if (this.state.highestBidderAddress !== '' && this.state.highestBidValue !== '') {

            winningText = `The winner of the bid is ${this.state.highestBidderAddress} with a bid of ${this.state.highestBidValue}`

        }

        let endAuctionText = "";
        if (this.state.highestBidderAddress === "0x0000000000000000000000000000000000000000") {
            endAuctionText = `Please click the "End Auction" button below.`
        } else if (this.state.highestBidderAddress !== '' && this.state.highestBidValue !== '') {
            endAuctionText = `If you are the winner, please click the "End Auction" button below to claim your domain ownership.`
        }

        return (<div>
            <p style={{ width: "60%", margin: "auto", fontSize: "18px", marginBottom: "20px" }} >
                This auction is currently in the <b>End Stage</b>, as both its Bidding and Reveal Stages have already concluded.
                <br /><br />
                {winningText}
                <br /><br />
                {endAuctionText}
            </p>
            <br />
            {button}

        </div>);
    }
}
export default EndStage;