PROGRESS :

  ***Exchange*** <br>
&ensp;    **Deployment**<br>
      ✔ Tracks the FEE account<br>
      ✔ Tracks the FEE percent<br>
    **Depositing Tokens**<br>
&ensp;      **Success**<br>
&emsp;        ✔ Tracks the token deposit<br>
&emsp;        ✔ Emits a Deposit EVENT<br>
&ensp;      **Failure**<br>
        ✔ Fails when n token are approved<br>
    **Withdraw Tokens**<br>
&ensp;      **Success**<br>
        ✔ Withdraw token funds<br>
        ✔ Emits a Withdraw EVENT<br>
&ensp;      **Failure**<br>
        ✔ Fails for insufficient balance<br>
    **Checking Blanaces**<br>
      ✔ Returns user balance<br>
    **Making orders**<br>
&ensp;      **Success**<br>
&emsp;        ✔ Track the newly created order<br>
&emsp;        ✔ Emits a Order EVENT<br>
      **Failure**<br>
        ✔ Reject orders with no balance<br>
    **Order actions**<br>
      **Cancelling orders**<br>
&ensp;        **Success**<br>
&emsp;          ✔ updates cancelled orders<br>
&emsp;          ✔ Emits a Order Cancel EVENT<br>
&ensp;        **Failure**<br>
          ✔ Rejects invalid order ids<br>
          ✔ Rejects unauthorised cancellations<br>
      **Filling orders**<br>
&ensp;        **Success**<br>
&emsp;          ✔ Executes the trade and charge fees<br>
&emsp;          ✔ Update filled orders<br>
&emsp;          ✔ Emits a Trade EVENT<br>
&ensp;        **Failure**<br>
&emsp;          ✔ rejects invalid order id<br>
&emsp;          ✔ rejects already filled orders <br>
&emsp;          ✔ rejects already filled orders <br>

  ***Token***<br>
    **Deployment**<br>
      ✔ have the name Liquidity<br>
      ✔ have the Symbol LIQ<br>
      ✔ have the decimals 18<br>
      ✔ have the total supply 1 million<br>
      ✔ assign total supply to deployer<br>
    **Sending Token**<br>
&ensp;      **Success**<br>
&emsp;        ✔ Transfers Tokens<br>
&emsp;        ✔ Emits a transfer function<br>
&ensp;      **Failure**<br>
&emsp;        ✔ Rejects insufficient balances<br>
&emsp;        ✔ Rejects to invalid recipient<br>
    **Approving Tokens**<br>
&ensp;      **Success**<br>
&emsp;        ✔ Allocates an allowance for delegated token spending<br>
&emsp;        ✔ Emits a approval function<br>
&ensp;      **Failure**<br>
&emsp;        ✔ Rejects invalid Spenders<br>
    **Deligated Token Transfers**<br>
&ensp;      **Success**<br>
&emsp;        ✔ Transfers token Balance<br>
&emsp;        ✔ Resets the allowance<br>
&emsp;        ✔ Emits a transfer function<br>
&ensp;      **Failure**<br>
&emsp;        ✔ Rejects insufficient balances<br>
&emsp;        ✔ Rejects to invalid recipient<br>