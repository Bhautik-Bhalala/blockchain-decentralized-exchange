#***PROGRESS : Smart Contract ***

  ***Exchange*** <br>
&ensp;    **Deployment**<br>
&emsp;&emsp;      ✔ Tracks the FEE account<br>
&emsp;&emsp;      ✔ Tracks the FEE percent<br>
&ensp;    **Depositing Tokens**<br>
&emsp;      **Success**<br>
&emsp;&emsp;        ✔ Tracks the token deposit<br>
&emsp;&emsp;        ✔ Emits a Deposit EVENT<br>
&emsp;     **Failure**<br>
&emsp;&emsp;        ✔ Fails when n token are approved<br>
&ensp;    **Withdraw Tokens**<br>
&emsp;      **Success**<br>
&emsp;&emsp;        ✔ Withdraw token funds<br>
&emsp;&emsp;        ✔ Emits a Withdraw EVENT<br>
&emsp;      **Failure**<br>
&emsp;&emsp;       ✔ Fails for insufficient balance<br>
&ensp;    **Checking Blanaces**<br>
&emsp;&emsp;      ✔ Returns user balance<br>
&ensp;    **Making orders**<br>
&emsp;      **Success**<br>
&emsp;&emsp;        ✔ Track the newly created order<br>
&emsp;&emsp;        ✔ Emits a Order EVENT<br>
&emsp;      **Failure**<br>
&emsp;&emsp;        ✔ Reject orders with no balance<br>
&ensp;    **Order actions**<br>
&emsp;      **Cancelling orders**<br>
&emsp;&ensp;        **Success**<br>
&emsp;&emsp;          ✔ updates cancelled orders<br>
&emsp;&emsp;          ✔ Emits a Order Cancel EVENT<br>
&emsp;&ensp;        **Failure**<br>
&emsp;&emsp;          ✔ Rejects invalid order ids<br>
&emsp;&emsp;          ✔ Rejects unauthorised cancellations<br>
&ensp;      **Filling orders**<br>
&emsp;&ensp;        **Success**<br>
&emsp;&emsp;          ✔ Executes the trade and charge fees<br>
&emsp;&emsp;          ✔ Update filled orders<br>
&emsp;&emsp;          ✔ Emits a Trade EVENT<br>
&emsp;&ensp;        **Failure**<br>
&emsp;&emsp;          ✔ rejects invalid order id<br>
&emsp;&emsp;          ✔ rejects already filled orders <br>
&emsp;&emsp;          ✔ rejects already filled orders <br>

  ***Token***<br>
&ensp;    **Deployment**<br>
&emsp;&emsp;      ✔ have the name Liquidity<br>
&emsp;&emsp;      ✔ have the Symbol LIQ<br>
&emsp;&emsp;      ✔ have the decimals 18<br>
&emsp;&emsp;      ✔ have the total supply 1 million<br>
&emsp;&emsp;      ✔ assign total supply to deployer<br>
&ensp;    **Sending Token**<br>
&emsp;      **Success**<br>
&emsp;&emsp;        ✔ Transfers Tokens<br>
&emsp;&emsp;        ✔ Emits a transfer function<br>
&emsp;      **Failure**<br>
&emsp;&emsp;        ✔ Rejects insufficient balances<br>
&emsp;&emsp;        ✔ Rejects to invalid recipient<br>
&ensp;    **Approving Tokens**<br>
&emsp;      **Success**<br>
&emsp;&emsp;        ✔ Allocates an allowance for delegated token spending<br>
&emsp;&emsp;        ✔ Emits a approval function<br>
&emsp;      **Failure**<br>
&emsp;&emsp;        ✔ Rejects invalid Spenders<br>
&ensp;    **Deligated Token Transfers**<br>
&emsp;      **Success**<br>
&emsp;&emsp;        ✔ Transfers token Balance<br>
&emsp;&emsp;        ✔ Resets the allowance<br>
&emsp;&emsp;        ✔ Emits a transfer function<br>
&emsp;      **Failure**<br>
&emsp;&emsp;        ✔ Rejects insufficient balances<br>
&emsp;&emsp;       ✔ Rejects to invalid recipient<br>