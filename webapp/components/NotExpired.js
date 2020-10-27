import React from "react";

class NotExpired extends React.Component {

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
                <img style={{ width: "100px" }} src={require('../assets/cancel.png')} />

                <h1 >{this.props.domainName} has not yet expired</h1>
                <p style={{ width: "45%", margin: "auto", fontSize: "18px", marginBottom: "20px" }} >
                    Unfortunately, this domain name is still currently owned by someone in the Ethereum Network, and has not yet expired. Thus, the domain name is not available for auction.
                    <br /><br />
                    Please check back again next time!
                </p>

            </div>
        );
    }
}

export default NotExpired;