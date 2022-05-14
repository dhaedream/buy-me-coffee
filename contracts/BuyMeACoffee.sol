// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

import "hardhat/console.sol";

contract BuyMeACoffee {
// event to emit when memo is created
event NewMemo() {
    // indexed adds counter to query
    address indexed from,
    uint256 timestamp,
    string name,
    string message,
}  

// memo struck 
struct Memo {
    address from;
    uint256 timestamp;
    string name;
    string message;
}

// list of all memos recieved
Memo[] memos;

// address of contract deployer  (for when its time to collect tips)
address payable owner;

constructor() {
    owner = payable(msg.sender);
}
// memory neans dynamic storage 
function buyCooffee(string memory _name,string memory _message) public payable {
    
}

}
