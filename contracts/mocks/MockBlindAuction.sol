pragma solidity >0.4.23 <0.7.0;
import "../BlindAuction.sol";

contract MockBlindAuction is BlindAuction {
    constructor(
        uint _biddingTime,
        uint _revealTime,
        string memory _url
    ) public BlindAuction(_biddingTime, _revealTime, _url) {}


    function moveAheadBiddingTime(uint secs) external {
        biddingEnd -= secs;
    }

    function moveAheadRevealTime(uint secs) external {
        revealEnd -= secs;
    }
}