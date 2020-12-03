 
// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.8.0;

contract EtherWallet {

    address public owner;

    constructor(address _owner) public {
        owner = _owner;
    }
    
    function deposit() payable public {

    }

    function send(address payable _to, uint _amount) public {
        if(msg.sender == owner){
            _to.transfer(_amount);
            return;
        }
        revert('Sender is not allowed');
    }

    function balanceOf() view public returns(uint){
        return address(this).balance;
    }
}