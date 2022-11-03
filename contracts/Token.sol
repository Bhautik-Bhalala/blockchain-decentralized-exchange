// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.0;

import "hardhat/console.sol";

contract Token{
    string public name;
    string public symbol;
    uint256 public decimals = 18;
    uint256 public totalSupply; 

    mapping (address => uint256) public balanceOf;

    event Transfer(
        address indexed from,
        address indexed to,
        uint256 value
    );

    constructor(
        string memory _name , 
        string memory _symbol , 
        uint256 _totalsupply)
    {
        name = _name;
        symbol = _symbol;
        totalSupply = _totalsupply * (10**decimals);
        balanceOf[msg.sender] = totalSupply;   
    }

    function transfer(address _to , uint256 _value) 
        public 
        returns (bool success)
        {   
            require(balanceOf[msg.sender] >= _value );
            require(_to != address(0));

            balanceOf[msg.sender] = balanceOf[msg.sender] - _value;
            balanceOf[_to] = balanceOf[_to] + _value;

            emit Transfer(msg.sender , _to, _value);
            return true;
        }



}