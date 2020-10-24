pragma solidity >0.4.23 <0.7.0;

import "./BlindAuction.sol";

contract Dns {

    struct AuctionItem {
        BlindAuction auction;
        address addr;
        uint bidding_end;
    }

    event Registration(
        address indexed _new_owner,
        string _url,
        uint _expiry_date
    );

    mapping (address => string[]) private reverse_lookup_table;
    address[] private address_list;
    mapping (address => bool) private address_not_unique;
    mapping (string => address) private dns_lookup_table;
    mapping (string => uint) public expiry_date;
    address public owner;
    mapping (string => AuctionItem) private auctions;
    uint public expiry = 52 weeks;
    uint256 MAX_UINT;

    uint public bidding_length = 10 minutes;
    uint public reveal_length = 5 minutes;

    constructor () public {
        owner = msg.sender;
        MAX_UINT = 2**256 - 1;
    }

    function getAddresses() public view returns (address[] memory) {
        return address_list;
    }

    function getURLCount(address addr) public view returns (uint) {
        return reverse_lookup_table[addr].length;
    }

    function getURL(address addr, uint idx) public view returns (string memory) {
        return reverse_lookup_table[addr][idx];
    }

    function getRegisteredURL(string memory url) public view returns (address) {
        return dns_lookup_table[url];
    }

    function checkExpired(string memory url) public view returns (bool) {
        return (now >= expiry_date[url]);
    }

    function startAuction(string memory url) private {
        AuctionItem memory new_auction;
        // Init new auction here
        auctions[url] = new_auction;
    }

    function createAuction() private returns (BlindAuction) {
        BlindAuction auction = new BlindAuction(bidding_length, reveal_length);
        return auction;
    }

    function checkAuctionEnded(string memory url) private view returns (bool) {
        return auctions[url].auction.ended();
    }

    function getAuctionURL(string memory url) public returns (address) {

        AuctionItem memory auc = auctions[url];
        // Check if registration has expired
        if (!checkExpired(url)) {
            // url registration not yet expired
            return address(0);
        }
        // Check if auction exists
        if (auc.addr == address(0)) {
            // Does not exists
            startAuction(url);
            return auc.addr;
        }
        // Check if auction ended
        if (checkAuctionEnded(url)) {
            // Auction ended, and registration expired, new auction to start
            startAuction(url);
        }
        return auc.addr;
    }

    function internalAddressRegister(string memory url, address new_owner) private {
        
        // If previously registered
        if (dns_lookup_table[url] != address(0)) {
            address prev_owner = dns_lookup_table[url];
            uint url_num = getURLCount(prev_owner);
            uint idx = MAX_UINT;

            // look for index in reverese table that corresponds to the url
            for (uint i = 0; i < url_num; i++) {
                // Because solidity can't compare strings, need convoluted method
                if (keccak256(bytes(reverse_lookup_table[prev_owner][i])) == keccak256(bytes(url))) {
                    idx = i;
                    break;
                }
            }

            // Check that a url was matched
            assert(idx != MAX_UINT);

            // If previous owner is the only url for that address
            if (idx == 0) {

                // find and remove previous owner in address list
                for (uint j = 0; j < address_list.length; j++) {
                    if (address_list[j] == prev_owner) {
                        address_list[j] = address_list[address_list.length -1];
                        address_list.pop();
                        address_not_unique[prev_owner] = false;
                        break;
                    }
                }
            }
        
            // move the last url to the position to be deleted
            reverse_lookup_table[prev_owner][idx] = reverse_lookup_table[prev_owner][reverse_lookup_table[prev_owner].length - 1];
            // remove last element
            reverse_lookup_table[prev_owner].pop();
        }

        // Add new owner into the reverse lookup table
        reverse_lookup_table[new_owner].push(url);
        // Update DNS routing table
        dns_lookup_table[url] = new_owner;
        // Change expiry date
        expiry_date[url] = now + expiry;

        // Add addr to address list if new addr
        if (!address_not_unique[new_owner]) {
            address_list.push(new_owner);
            address_not_unique[new_owner] = true;
        }


    }

    function registerAddress(string memory url, address addr) public payable {
        address auc_addr = msg.sender;
        // Check if url is expired
        if (checkExpired(url)) {
            // Check if calling auction address is valid
            require(auctions[url].addr == auc_addr);
            internalAddressRegister(url, addr);
            emit Registration(addr, url, expiry_date[url]);
        }
    }
}