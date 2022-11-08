import { ethers } from 'ethers'
import TOKEN_ABI from '../abis/Token.json';

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

export const loadAccount = async (dispatch) => {
  const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' })
  const account = ethers.utils.getAddress(accounts[0])

  dispatch({ type: 'ACCOUNT_LOADED', account })

  return account
}

export const loadToken = async (provider, address, dispatch) => {
  let token, symbol

  token = new ethers.Contract(address, TOKEN_ABI, provider)
  symbol = await token.symbol()
  dispatch({ type: 'TOKEN_LOADED', token, symbol })

  return token
}
