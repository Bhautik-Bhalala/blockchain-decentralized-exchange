PROGRESS :

***Hybrid*** Exchange <br>
**Bold**   Deployment<br>
      ✔ Tracks the FEE account<br>
      ✔ Tracks the FEE percent<br>
**Bold**  Depositing Tokens<br>
**Bold**      Success<br>
        ✔ Tracks the token deposit<br>
        ✔ Emits a Deposit EVENT<br>
**Bold**      Failure<br>
        ✔ Fails when n token are approved<br>
**Bold**    Withdraw Tokens<br>
**Bold**      Success<br>
        ✔ Withdraw token funds<br>
        ✔ Emits a Withdraw EVENT<br>
**Bold**      Failure<br>
        ✔ Fails for insufficient balance<br>
**Bold**    Checking Blanaces<br>
      ✔ Returns user balance<br>
**Bold**    Making orders<br>
**Bold**      Success<br>
        ✔ Track the newly created order<br>
        ✔ Emits a Order EVENT<br>
**Bold**      Failure<br>
        ✔ Reject orders with no balance<br>
**Bold**    Order actions<br>
**Bold**      Cancelling orders<br>
**Bold**        Success<br>
          ✔ updates cancelled orders<br>
          ✔ Emits a Order Cancel EVENT<br>
**Bold**        Failure<br>
          ✔ Rejects invalid order ids<br>
          ✔ Rejects unauthorised cancellations<br>
**Bold**      Filling orders<br>
**Bold**        Success<br>
          ✔ Executes the trade and charge fees<br>
          ✔ Update filled orders<br>
          ✔ Emits a Trade EVENT<br>
**Bold**        Failure<br>
          ✔ rejects invalid order id<br>
          ✔ rejects already filled orders <br>
          ✔ rejects already filled orders <br>

***Hybrid*** Token<br>
**Bold**    Deployment<br>
      ✔ have the name Liquidity<br>
      ✔ have the Symbol LIQ<br>
      ✔ have the decimals 18<br>
      ✔ have the total supply 1 million<br>
      ✔ assign total supply to deployer<br>
**Bold**    Sending Token<br>
**Bold**      Success<br>
        ✔ Transfers Tokens<br>
        ✔ Emits a transfer function<br>
**Bold**      Failure<br>
        ✔ Rejects insufficient balances<br>
        ✔ Rejects to invalid recipient<br>
**Bold**    Approving Tokens<br>
**Bold**      Success<br>
        ✔ Allocates an allowance for delegated token spending<br>
        ✔ Emits a approval function<br>
**Bold**      Failure<br>
        ✔ Rejects invalid Spenders<br>
**Bold**    Deligated Token Transfers<br>
**Bold**      Success<br>
        ✔ Transfers token Balance<br>
        ✔ Resets the allowance<br>
        ✔ Emits a transfer function<br>
**Bold**      Failure<br>
        ✔ Rejects insufficient balances<br>
        ✔ Rejects to invalid recipient<br>