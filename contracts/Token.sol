// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.0;

import "hardhat/console.sol";

contract Token{
    string public name;
    string public symbol;
    uint256 public decimals = 18;
    uint256 public totalSupply; 

    mapping (address => uint256) public balanceOf;

    constructor(string memory _name , string memory _symbol , uint256 _totalsupply){
        name = _name;
        symbol = _symbol;
        totalSupply = _totalsupply * (10**decimals);
        balanceOf[msg.sender] = totalSupply;
    }



}