pragma solidity >0.4.23 <0.7.0;

contract BlindAuction {
    address payable public beneficiary;
    uint256 public biddingEnd;
    uint256 public revealEnd;
    string public url;
    bool public ended;

    // mapping(address => Bid[]) public bids;
    mapping(address => bytes32[]) public bids;
    mapping(address => uint256) deposits;

    address public highestBidder;
    uint256 public highestBid;

    // Allowed withdrawals of previous bids
    mapping(address => uint256) pendingReturns;

    event AuctionEnded(address winner, uint256 highestBid);

    event BidCreated(
        bytes32 bidHash,
        uint256 deposit,
        address bidder,
        uint256 value
    );

    event ProcessReveal(uint256 deposits);

    event RevealHashes(bytes32 original, bytes32 test);

    event WithdrawEther(uint256 amount, address recipient);

    /// Modifiers are a convenient way to validate inputs to
    /// functions. `onlyBefore` is applied to `bid` below:
    /// The new function body is the modifier's body where
    /// `_` is replaced by the old function body.
    modifier onlyBefore(uint256 _time) {
        require(now < _time);
        _;
    }
    modifier onlyAfter(uint256 _time) {
        require(now > _time);
        _;
    }

    constructor(
        uint256 _biddingTime,
        uint256 _revealTime,
        string memory _url
    ) public payable {
        // beneficiary will always be dns manager contract
        beneficiary = msg.sender;
        url = _url;
        biddingEnd = now + _biddingTime;
        revealEnd = biddingEnd + _revealTime;
    }

    /// Place a blinded bid with `_blindedBid` =
    /// keccak256(abi.encodePacked(value, real, secret)).
    /// The sent ether is only refunded if the bid is correctly
    /// revealed in the revealing phase. The bid is valid if the
    /// ether sent together in all bids sent by that user
    /// with the bid is at least "value" of non-fake bids which are when
<<<<<<< HEAD
    /// "real" is true.
=======
    /// "real" is true. 
>>>>>>> 49c8d0a58b21845d8e2617bd04d9f86adbe52ae8
    /// Setting "real" to false and sending
    /// not the exact amount are ways to hide the real bid but
    /// still make the required deposit. The same address can
    /// place multiple bids.
    function bid(bytes32 _blindedBid)
        public
        payable
        onlyBefore(biddingEnd)
    {
        require(_blindedBid.length > 0);
        address _bidder = msg.sender;
        bids[_bidder].push(_blindedBid);
        deposits[_bidder] += msg.value;
        emit BidCreated(
            bids[_bidder][bids[_bidder].length - 1],
            deposits[_bidder],
            _bidder,
            msg.value
        );
    }

    // Reveal bids to verify bids that were sent by the user,
    // this will effectively allow the user to test if he has
    // the highest bid by verifying he actually sent it.
    // Bids has to be sent in order of bidding for reveal
    // TODO: ONLY ALLOW a user to reveal only
    function reveal(
<<<<<<< HEAD
        uint256[] memory _values,
=======
        uint[] memory _values,
>>>>>>> 49c8d0a58b21845d8e2617bd04d9f86adbe52ae8
        bool[] memory _real,
        bytes32[] memory _secret
    )
        public
        onlyAfter(biddingEnd)
        onlyBefore(revealEnd)
        returns (bool isValid)
    {
        isValid = true;
        uint256 length = bids[msg.sender].length;
        require(_values.length == length);
        require(_real.length == length);
        require(_secret.length == length);
        // uint refund;
        for (uint256 i = 0; i < length; i++) {
            bytes32 bidToCheck = bids[msg.sender][i];
<<<<<<< HEAD

            (uint256 value, bool real, bytes32 secret) = (
                _values[i],
                _real[i],
                _secret[i]
            );
            // TODO: FIX hash difference in JS and here
            // emit RevealHashes(bidToCheck, keccak256(abi.encodePacked(value, real, secret)));
            if (
                bidToCheck != keccak256(abi.encodePacked(value, real, secret))
            ) {
=======
            
            (uint value, bool real, bytes32 secret) =
                    (_values[i], _real[i], _secret[i]);
            // emit RevealHashes(bidToCheck, keccak256(abi.encodePacked(value, real, secret)));
            if (bidToCheck != keccak256(abi.encodePacked(value, real, secret))) {
>>>>>>> 49c8d0a58b21845d8e2617bd04d9f86adbe52ae8
                // Bid was not actually revealed.
                // Do not refund deposit.
                isValid = false;
                continue;
            }
            if (real && deposits[msg.sender] >= value) {
<<<<<<< HEAD
                if (placeBid(msg.sender, value)) deposits[msg.sender] -= value;
=======
                if (placeBid(msg.sender, value))
                    deposits[msg.sender] -= value;
>>>>>>> 49c8d0a58b21845d8e2617bd04d9f86adbe52ae8
            }
            // Make it impossible for the sender to re-claim
            // the same deposit.
            bids[msg.sender][i] = bytes32(0);
        }
        // return all deposits to user
        pendingReturns[msg.sender] += deposits[msg.sender];
        emit ProcessReveal(deposits[msg.sender]);
        // _bidder.transfer(refund);
        return isValid;
    }

    // This is an "internal" function which means that it
    // can only be called from the contract itself (or from
    // derived contracts).
    function placeBid(address bidder, uint256 value)
        internal
        returns (bool success)
    {
        if (value <= highestBid) {
            return false;
        }
        if (highestBidder != address(0)) {
            // Refund the previously highest bidder to deposits.
            pendingReturns[highestBidder] += highestBid;
        }
        highestBid = value;
        highestBidder = bidder;
        return true;
    }

    /// End the auction and send the highest bid
    /// to the beneficiary.
    /// refund everyone's deposit using withdraw call
    function auctionEnd() public onlyAfter(revealEnd) returns (address) {
        require(!ended);
        emit AuctionEnded(highestBidder, highestBid);
        // TODO: CALL beneficiary function plus transfer funds instead of direct call
        // beneficiary.registerWinner();
        // beneficiary.call.value(highestBid).gas(10)(abi.encodeWithSignature("registerAddress(string, address)", url, highestBidder));
        beneficiary.transfer(highestBid);
        ended = true;
        return highestBidder;
    }

    /// Withdraw a bid that was overbid.
    // called after auction end
    function withdraw() public returns (uint256 amount) {
        require(ended);
        amount = pendingReturns[msg.sender];
        if (amount > 0) {
            // It is important to set this to zero because the recipient
            // can call this function again as part of the receiving call
            // before `transfer` returns (see the remark above about
            // conditions -> effects -> interaction).
            pendingReturns[msg.sender] = 0;

            msg.sender.transfer(amount);
        }
        emit WithdrawEther(amount, msg.sender);
        return amount;
    }
}
