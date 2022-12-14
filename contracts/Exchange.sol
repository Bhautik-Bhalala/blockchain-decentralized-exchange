// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.0;

import "hardhat/console.sol";
import "./Token.sol";

contract Exchange{
    address public feeAccount;
    uint256 public feePercent;
    mapping(address => mapping(address => uint256)) public tokens;
    mapping (uint256 => _Order) public orders;
    uint256 public ordersCount;
    mapping(uint256 => bool) public orderCancelled;
    mapping(uint256 => bool) public orderFilled;


    //A way to model the order
    struct _Order{
        //Attribute of an Order
        uint256 id; //unique identifier for order
        address user; //user who made the order
        address tokenGet; //address of the token they recieve
        uint256 amountGet; //amount they recieve
        address tokenGive; //address of taken they give
        uint256 amountGive; //amount they give
        uint256 timestamp; //when order was created

    } 

    event Deposit(address token , address user , uint256 amount , uint256 balance);

    event Withdraw(address token , address user , uint256 amount , uint256 balance);

    event Order(        
        uint256 id, 
        address user,
        address tokenGet,
        uint256 amountGet,
        address tokenGive,
        uint256 amountGive,
        uint256 timestamp);

    event Cancel(        
        uint256 id, 
        address user,
        address tokenGet,
        uint256 amountGet,
        address tokenGive,
        uint256 amountGive,
        uint256 timestamp);

    event Trade(        
        uint256 id, 
        address user,
        address tokenGet,
        uint256 amountGet,
        address tokenGive,
        uint256 amountGive,
        address creator,
        uint256 timestamp);

    constructor(address _feeAccount , uint256 _feePercent){
        feeAccount = _feeAccount;
        feePercent = _feePercent;
    }

    //-------------------------------------------------------------
    // DEPOSIT & WITHDRAW TOKEN

    function depositToken(address _token , uint256 _amount) public{

        //transfer tokens to exchange
        require(Token(_token).transferFrom(msg.sender, address(this), _amount));

        //update user balance
        tokens[_token][msg.sender] = tokens[_token][msg.sender] + _amount;

        //emit an event
        emit Deposit(_token, msg.sender , _amount , tokens[_token][msg.sender]);
        
    }

    function withdrawToken(address _token , uint256 _amount) public {

        //ensure user has enough tokens to withdraw
        require(tokens[_token][msg.sender] >= _amount);

        //transfer tokens to user
        Token(_token).transfer(msg.sender , _amount);
        
        //update user balance
        tokens[_token][msg.sender] = tokens[_token][msg.sender] - _amount;


        //emit event
        emit Withdraw(_token, msg.sender , _amount , tokens[_token][msg.sender]);


    }

    function balanceOf(address _token,address _user)
        public
        view
        returns(uint256)
    {
        return tokens[_token][_user];
    }

    // ==========================
    // Make and cancel order

    // token give (the token they want to spend) - which token and how much?

    //token get(the token they want to recieve) - which token and how much ?

    function makeOrder(
        address _tokenGet , 
        uint256 _amountGet , 
        address _tokenGive , 
        uint256 _amountGive) 
        public {
            require (balanceOf(_tokenGive , msg.sender ) >=_amountGive);
            ordersCount = ordersCount + 1;
            orders[ordersCount] = _Order
            (
                1,
                msg.sender,
                _tokenGet,
                _amountGet,
                _tokenGive,
                _amountGive,
                block.timestamp
             );

             emit Order(ordersCount, 
             msg.sender, 
             _tokenGet, 
             _amountGet, 
             _tokenGive, 
             _amountGive, 
             block.timestamp);
    }

    function cancelOrder(uint256 _id) public {
        _Order storage _order = orders[_id];

        orderCancelled[_id] = true;

        require(address(_order.user) == msg.sender);

        require(_order.id == _id);

        //emit event 
             emit Cancel(
                _order.id, 
             msg.sender, 
             _order.tokenGet, 
             _order.amountGet, 
             _order.tokenGive, 
             _order.amountGive, 
             block.timestamp);
    }

    ///Executing Orders

    function fillOrder(uint256 _id) public {

        //must be valid order
        require(_id > 0 && _id <=ordersCount , "Ourder Does not Exists");

        //order cant be filled 
        require(!orderFilled[_id]);

        // order cnat be canceled 
        require(!orderCancelled[_id]);
        //fetchorder
        _Order storage _order = orders[_id];

        //swappimg tokens 
        _trade(
            _order.id, 
            _order.user, 
            _order.tokenGet, 
            _order.amountGet, 
            _order.tokenGive, 
            _order.amountGive
        );

        orderFilled[_order.id] = true;

                //emit event 

    }

    function _trade(
        uint256 _orderId, address _user , address _tokenGet,
        uint256 _amountGet , address _tokenGive , uint256 _amountGive
    ) internal{

        //fees is paid by buyer
        uint256 _feeAmount = (_amountGet * feePercent) /100;

        //do the trade 
        tokens[_tokenGet][msg.sender]  = tokens[_tokenGet][msg.sender] - (_amountGet + _feeAmount);
        tokens[_tokenGet][_user] = tokens[_tokenGet][_user] + _amountGet;

        //charge fees
        tokens[_tokenGet][feeAccount] = tokens[_tokenGet][feeAccount] + _feeAmount;

        tokens[_tokenGive][_user] = tokens[_tokenGive][_user] - _amountGive;
        tokens[_tokenGive][msg.sender] = tokens[_tokenGive][msg.sender] + _amountGive;

        emit Trade(
            _orderId, 
             msg.sender, 
             _tokenGet, 
             _amountGet, 
             _tokenGive, 
             _amountGive,
             _user, 
             block.timestamp);
    }
}