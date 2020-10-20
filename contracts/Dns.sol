pragma solidity ^0.5.16;

contract Dns {
    mapping (address => string) private reverse_lookup_table;
    mapping (string => address) private dns_lookup_table;
    address public owner;

    constructor () public {
        owner = msg.sender;
    }

    function lookup_address(string memory url) public view returns (address) {
        return dns_lookup_table[url];
    }

    function reverse_lookup(address addr) public view returns (string memory) {
        string memory url = string(reverse_lookup_table[addr]);
        return url;
    }

    function register(address addr, string memory url) public {
        require(msg.sender == owner);
        reverse_lookup_table[addr] = url;
        dns_lookup_table[url] = addr;
    }

    function deregister(string memory url) public {
        require(msg.sender == owner);
        address addr = dns_lookup_table[url];
        delete(dns_lookup_table[url]);
        delete(reverse_lookup_table[addr]);
    }
}
