// SPDX-License-Identifier: MIT
pragma solidity >=0.4.0 <0.9.0;

import "hardhat/console.sol";

contract BuyMeACoffee {
    // event to emit when memo is created
    event NewMemo(
        // indexed adds count
        address indexed from,
        uint256 timestamp,
        string name,
        string message
    );  
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
    function buyCoffee(string memory _name,string memory _message) public payable {
    // requires that payment is greater than 0
    require(msg.value > 0, "can't buy coffee w 0 ETH");

    // add to array
    memos.push(Memo(
        msg.sender,
        block.timestamp,
        _name,
        _message
    ));

    // emits a log event when memo is created 
     emit NewMemo(
        msg.sender,
        block.timestamp,
        _name,
        _message
        );
    }

    /// @dev send entire balance stores in contract
    function withdrawTips() public {
        
        require(owner.send(address(this).balance));
    }

  /// @dev retrieve all memos recieved+stored on blockchain
    // return array Memo[] in memory
    function getMemos() public view returns(Memo[] memory) {
        return memos;
    }

}
