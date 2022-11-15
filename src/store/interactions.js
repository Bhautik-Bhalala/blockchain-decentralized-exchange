import { ethers } from 'ethers'
import TOKEN_ABI from '../abis/Token.json';
import EXCHANGE_ABI from '../abis/Exchange.json';
import { TransactionDescription } from 'ethers/lib/utils';
import { exchange } from './reducers';

export const loadProvider = (dispatch) => {
  const connection = new ethers.providers.Web3Provider(window.ethereum)
  dispatch({ type: 'PROVIDER_LOADED', connection })

  return connection
}

export const loadNetwork = async (provider, dispatch) => {
  const { chainId } = await provider.getNetwork()
  dispatch({ type: 'NETWORK_LOADED', chainId })

  return chainId
}

export const loadAccount = async (provider, dispatch) => {
  const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' })
  const account = ethers.utils.getAddress(accounts[0])

  dispatch({ type: 'ACCOUNT_LOADED', account })

  let balance = await provider.getBalance(account)
  balance = ethers.utils.formatEther(balance)

  dispatch({ type: 'ETHER_BALANCE_LOADED', balance })

  return account
}

export const loadTokens = async (provider, addresses, dispatch) => {
  let token, symbol

  token = new ethers.Contract(addresses[0], TOKEN_ABI, provider)
  symbol = await token.symbol()
  dispatch({ type: 'TOKEN_1_LOADED', token, symbol })

  token = new ethers.Contract(addresses[1], TOKEN_ABI, provider)
  symbol = await token.symbol()
  dispatch({ type: 'TOKEN_2_LOADED', token, symbol })

  return token
}

export const loadExchange = async (provider, address, dispatch) => {
  const exchange = new ethers.Contract(address, EXCHANGE_ABI, provider);
  dispatch({ type: 'EXCHANGE_LOADED', exchange })

  return exchange
}
export const subscribeToEvents = (exchange , dispatch) => {
  exchange.on('Deposit' , (token , user , amount , balance, event) => {
    dispatch({type: 'TRANSFER_SUCCESS' , event});
  })
  exchange.on('Withdraw' , (token , user , amount , balance, event) => {
    dispatch({type: 'TRANSFER_SUCCESS' , event});
  })
}

export const loadBalances = async (exchange , tokens, account, dispatch) => {
let balance = ethers.utils.formatUnits(await tokens[0].balanceOf(account) , 18)
dispatch({type : 'TOKEN_1_BALANCE_LOADED',balance})

 balance = ethers.utils.formatUnits(await exchange.balanceOf(tokens[0].address , account) , 18)
 dispatch({type : 'EXCHANGE_TOKEN_1_BALANCE_LOADED',balance})

 balance = ethers.utils.formatUnits(await tokens[1].balanceOf(account) , 18)
 dispatch({type : 'TOKEN_2_BALANCE_LOADED',balance})

 balance = ethers.utils.formatUnits(await exchange.balanceOf(tokens[1].address , account) , 18)
 dispatch({type : 'EXCHANGE_TOKEN_2_BALANCE_LOADED',balance})

}

////Transfer tokens (Deposit & Withdraw)

export const transferTokens =  async (provider, exchange, transferType, token, amount, dispatch) => {
  let transaction

  dispatch({ type: 'TRANSFER_REQUEST' })

  try {
    const signer = await provider.getSigner()
    const amountToTransfer = ethers.utils.parseUnits(amount.toString(), 18)

    if(transferType === 'Deposit'){
      transaction = await token.connect(signer).approve(exchange.address, amountToTransfer)
      await transaction.wait()
      transaction = await exchange.connect(signer).depositToken(token.address, amountToTransfer)
      await transaction.wait()
    }
    else if(transferType === 'Withdraw'){
      console.log("HERE")
      transaction = await exchange.connect(signer).withdrawToken(token.address, amountToTransfer)
      await transaction.wait()

    }

  } catch(error) {
    dispatch({ type: 'TRANSFER_FAIL' })
  }
}
