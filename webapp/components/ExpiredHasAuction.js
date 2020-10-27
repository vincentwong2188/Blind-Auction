import React from "react";

import {
    startAuction,
} from "../dns.js"

import {
    biddingEnd,
    revealEnd,
} from "../blindAuction";

import BiddingStage from './auctionStages/BiddingStage';
import RevealStage from './auctionStages/RevealStage';
import EndStage from './auctionStages/EndStage';

class ExpiredHasAuction extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            // States for handling stage check:
            stage: 0,
        };
    }

    componentDidMount() {
        const stageCheck = async () => {
            let bidEndTime = await biddingEnd(this.props.contractAddress);
            console.log(bidEndTime)
            let revealEndTime = await revealEnd(this.props.contractAddress);
            console.log(revealEndTime)

            let timeNow = Math.floor(Date.now() / 1000);
            console.log(timeNow)

            if (timeNow <= bidEndTime) {
                this.setState({
                    stage: 1 // 1 
                })
            } else if (timeNow > bidEndTime && timeNow <= revealEndTime) {
                this.setState({
                    stage: 2 // 2
                })
            } else {
                this.setState({
                    stage: 3 // 3
                })
            }
        }
        stageCheck();
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


        let stage = null;
        switch (this.state.stage) {
            case 1:
                stage = <BiddingStage contractAddress={this.props.contractAddress} />;
                break;
            case 2:
                stage = <RevealStage contractAddress={this.props.contractAddress} />;
                break;
            case 3:
                stage = <EndStage contractAddress={this.props.contractAddress} />;
                break;

        }

        return (
            <div style={cardStyle}>
                <img style={{ width: "100px" }} src={require('../assets/checked.png')} />
                <h1 >{this.props.domainName} has an existing ongoing auction at stage {this.state.stage}!</h1>
                {stage}
            </div>
        );
    }
}

export default ExpiredHasAuction;