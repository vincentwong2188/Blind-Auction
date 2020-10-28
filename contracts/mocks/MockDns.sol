pragma solidity >0.4.23 <0.7.0;
import "../Dns.sol";

contract MockDns is Dns {
    constructor() public Dns() {}

    uint256 expiry = 5 seconds;
    uint256 bidding_length = 10 seconds;
    uint256 reveal_length = 5 seconds;

    function testFuncParam(int256 input_int) public pure returns (int256) {
        return input_int;
    }

    function testFunc() public pure returns (string memory) {
        return ("teststring.ntu");
    }

    function testRegisterFunc(string memory url, address addr) public {
        if (checkExpired(url)) {
            internalAddressRegister(url, addr);
            emit Registration(addr, url, expiry_date[url]);
        } else {
            emit Registration(address(0), "not expired", 0);
        }
    }
}
