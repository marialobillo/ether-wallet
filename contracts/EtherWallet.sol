 
// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.8.0;

contract EtherWallet {
    
    function deposit() payable public {

    }

    function send(address payable _to, uint _amount) public {
        _to.transfer(_amount);
    }
}