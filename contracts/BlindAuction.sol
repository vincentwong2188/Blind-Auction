pragma solidity >0.4.23 <0.7.0;
// import "./Dns.sol";

contract BlindAuction {
    // struct Bid {
    //     // bytes32 blindedBid;
    //     bytes32[] blindedBids;
    //     uint deposit;
    // }

<<<<<<< HEAD
    // TODO: ADD IN DEPOSIT MAPPING
    // TODO: API DOC

    address payable public beneficiary;
    uint256 public biddingEnd;
    uint256 public revealEnd;
=======
    address payable public beneficiary;
    uint public biddingEnd;
    uint public revealEnd;
    string public url;
>>>>>>> 0901f20a5f6096ea85f02e02fd14a8b130c20f3a
    bool public ended;

    // mapping(address => Bid[]) public bids;
    mapping(address => bytes32[]) public bids;
    mapping(address => uint256) deposits;

    address public highestBidder;
    uint256 public highestBid;

    // Allowed withdrawals of previous bids
    mapping(address => uint256) pendingReturns;

    event AuctionEnded(address winner, uint256 highestBid);

<<<<<<< HEAD
    event BidCreated(bytes32 bidHash, uint256 deposit, address bidder);
=======
    event BidCreated(bytes32 bidHash, uint deposit, address bidder, uint value);
>>>>>>> 0901f20a5f6096ea85f02e02fd14a8b130c20f3a

    event ProcessReveal(uint256 deposits);

    event RevealHashes(bytes32 original, bytes32 test);

    event WithdrawEther(uint amount, address recipient);

    /// Modifiers are a convenient way to validate inputs to
    /// functions. `onlyBefore` is applied to `bid` below:
    /// The new function body is the modifier's body where
    /// `_` is replaced by the old function body.
<<<<<<< HEAD
    modifier onlyBefore(uint256 _time) {
        require(now < _time);
        _;
    }
    modifier onlyAfter(uint256 _time) {
        require(now > _time);
        _;
    }

    constructor(uint256 _biddingTime, uint256 _revealTime)
        public
        payable
    // address payable _beneficiary
    {
=======
    modifier onlyBefore(uint _time) { require(now < _time); _; }
    modifier onlyAfter(uint _time) { require(now > _time); _; }

    constructor(
        uint _biddingTime,
        uint _revealTime
        // string memory _url
    ) payable public {
        // beneficiary will always be dns manager contract
>>>>>>> 0901f20a5f6096ea85f02e02fd14a8b130c20f3a
        beneficiary = msg.sender;
        // url = _url;
        biddingEnd = now + _biddingTime;
        revealEnd = biddingEnd + _revealTime;
    }

    /// Place a blinded bid with `_blindedBid` =
    /// keccak256(abi.encodePacked(value, fake, secret)).
    /// The sent ether is only refunded if the bid is correctly
    /// revealed in the revealing phase. The bid is valid if the
    /// ether sent together in all bids sent by that user
    /// with the bid is at least "value" of non-fake bids which are when
    /// "fake" is not true. 
    /// Setting "fake" to true and sending
    /// not the exact amount are ways to hide the real bid but
    /// still make the required deposit. The same address can
    /// place multiple bids.
    function bid(bytes32 _blindedBid, address _bidder)
        public
        payable
        onlyBefore(biddingEnd)
    {
        require(_blindedBid.length > 0);
        bids[_bidder].push(_blindedBid);
        deposits[_bidder] += msg.value;
<<<<<<< HEAD
        emit BidCreated(
            bids[_bidder][bids[_bidder].length - 1],
            deposits[_bidder],
            _bidder
        );
=======
        emit BidCreated(bids[_bidder][bids[_bidder].length-1], deposits[_bidder], _bidder, msg.value);
>>>>>>> 0901f20a5f6096ea85f02e02fd14a8b130c20f3a
    }

    // Reveal bids to verify bids that were sent by the user,
    // this will effectively allow the user to test if he has
    // the highest bid by verifying he actually sent it.
    // Bids has to be sent in order of bidding for reveal
    // TODO: ONLY ALLOW a user to reveal only
    function reveal(
        uint256[] memory _values,
        bool[] memory _fake,
        bytes32[] memory _secret
    )
        public
<<<<<<< HEAD
        returns (
            // onlyAfter(biddingEnd)
            // onlyBefore(revealEnd)
            bool isValid
        )
=======
        onlyAfter(biddingEnd)
        onlyBefore(revealEnd)
        returns (bool isValid)
>>>>>>> 0901f20a5f6096ea85f02e02fd14a8b130c20f3a
    {
        isValid = true;
        uint256 length = bids[msg.sender].length;
        require(_values.length == length);
        require(_fake.length == length);
        require(_secret.length == length);
        // uint refund;
        for (uint256 i = 0; i < length; i++) {
            bytes32 bidToCheck = bids[msg.sender][i];

            (uint256 value, bool fake, bytes32 secret) = (
                _values[i],
                _fake[i],
                _secret[i]
            );
            // TODO: FIX hash difference in JS and here
            emit RevealHashes(
                bidToCheck,
                keccak256(abi.encodePacked(value, fake, secret))
            );
            if (
                bidToCheck != keccak256(abi.encodePacked(value, fake, secret))
            ) {
                // Bid was not actually revealed.
                // Do not refund deposit.
                isValid = false;
                continue;
            }
            if (!fake && deposits[msg.sender] >= value) {
                if (placeBid(msg.sender, value)) deposits[msg.sender] -= value;
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
<<<<<<< HEAD
    // refund everyone's deposit using withdraw call
    function auctionEnd()
        public
        returns (
            // onlyAfter(revealEnd)
            address
        )
=======
    /// refund everyone's deposit using withdraw call 
    function auctionEnd()
        public
        onlyAfter(revealEnd)
        returns (address)
>>>>>>> 0901f20a5f6096ea85f02e02fd14a8b130c20f3a
    {
        require(!ended);
        emit AuctionEnded(highestBidder, highestBid);
        ended = true;
        // TODO: CALL beneficiary function plus transfer funds instead of direct call
        // beneficiary.registerWinner();
        beneficiary.transfer(highestBid);
        return highestBidder;
    }

    /// Withdraw a bid that was overbid.
    // called after auction end
<<<<<<< HEAD
    function withdraw()
        public
        returns (
            // address payable _bidder
            uint256 amount
        )
=======
    function withdraw() 
        public
        returns (uint amount) 
>>>>>>> 0901f20a5f6096ea85f02e02fd14a8b130c20f3a
    {
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
<<<<<<< HEAD
=======

>>>>>>> 0901f20a5f6096ea85f02e02fd14a8b130c20f3a
