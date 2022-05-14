// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

import "hardhat/console.sol";

contract BuyMeACoffee {
// event to emit when memo is created
event NewMemo() {
    
}  

// memo struck 
struct Memo {
    address from;
    uint256 timestamp;
    string name;
    string message;
}
}
