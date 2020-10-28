pragma solidity ^0.5.16;

contract Bank {
    mapping(address => uint256) private balances;
    address public owner;
    event LogDepositMade(address accountAddress, uint256 amount);

    // event BalanceFunctionEntered(address accountAddress);

    constructor() public {
        owner = msg.sender;
    }

    function deposit() public payable returns (uint256) {
        require((balances[msg.sender] + msg.value) >= balances[msg.sender]);

        balances[msg.sender] += msg.value;

        emit LogDepositMade(msg.sender, msg.value); // emit an event

        return balances[msg.sender];
    }

    function withdraw(uint256 withdrawAmount)
        public
        returns (uint256 remainingBal)
    {
        require(withdrawAmount <= balances[msg.sender]);

        balances[msg.sender] -= withdrawAmount;

        msg.sender.transfer(withdrawAmount);

        return balances[msg.sender];
    }

    function balance() public view returns (uint256) {
        // emit BalanceFunctionEntered(msg.sender); // emit an event

        return balances[msg.sender];
        // return 50000;
    }
}
