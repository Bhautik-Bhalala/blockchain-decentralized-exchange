#PROGRESS :

  Exchange
    Deployment
      ✔ Tracks the FEE account
      ✔ Tracks the FEE percent
    Depositing Tokens
      Success
        ✔ Tracks the token deposit
        ✔ Emits a Deposit EVENT
      Failure
        ✔ Fails when n token are approved
    Withdraw Tokens
      Success
        ✔ Withdraw token funds
        ✔ Emits a Withdraw EVENT
      Failure
        ✔ Fails for insufficient balance
    Checking Blanaces
      ✔ Returns user balance
    Making orders
      Success
        ✔ Track the newly created order
        ✔ Emits a Order EVENT
      Failure
        ✔ Reject orders with no balance
    Order actions
      Cancelling orders
        Success
          ✔ updates cancelled orders
          ✔ Emits a Order Cancel EVENT
        Failure
          ✔ Rejects invalid order ids
          ✔ Rejects unauthorised cancellations
      Filling orders
        Success
          ✔ Executes the trade and charge fees
          ✔ Update filled orders
          ✔ Emits a Trade EVENT
        Failure
          ✔ rejects invalid order id
          ✔ rejects already filled orders 
          ✔ rejects already filled orders 

  Token
    Deployment
      ✔ have the name Liquidity
      ✔ have the Symbol LIQ
      ✔ have the decimals 18
      ✔ have the total supply 1 million
      ✔ assign total supply to deployer
    Sending Token
      Success
        ✔ Transfers Tokens
        ✔ Emits a transfer function
      Failure
        ✔ Rejects insufficient balances
        ✔ Rejects to invalid recipient
    Approving Tokens
      Success
        ✔ Allocates an allowance for delegated token spending
        ✔ Emits a approval function
      Failure
        ✔ Rejects invalid Spenders
    Deligated Token Transfers
      Success
        ✔ Transfers token Balance
        ✔ Resets the allowance
        ✔ Emits a transfer function
      Failure
        ✔ Rejects insufficient balances
        ✔ Rejects to invalid recipient