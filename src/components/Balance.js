import dapp from '../assets/dapp.svg'
import eth from '../assets/eth.svg'
import { useEffect , useState} from 'react'

import { useSelector , useDispatch} from 'react-redux'

import { loadBalances } from '../store/interactions'
  
const Balance = () => {

  const [token1TransferAmount ,  setToken1TransferAmount] = useState(0)
    const tokens = useSelector(state => state.tokens.contracts)
    const account = useSelector(state => state.provider.account)
    const exchange = useSelector(state => state.exchange.contract)
    const exchangeBalances = useSelector(state => state.exchange.balances)

    const dispatch = useDispatch()

    const symbols = useSelector(state => state.tokens.symbols)

    const tokenBalances = useSelector(state => state.tokens.balances)

    const amountHandler =(e,token)=>{
      if(token.address === tokens[0].address){
        setToken1TransferAmount(e.target.value)
      }
      console.log({token1TransferAmount})
    }

    const depositHandler = (e,token) =>{
      e.preventDefault()
      if(token.address === tokens[0].address){

      }
    }

    useEffect(() => {
        if(exchange && tokens[0] && tokens[1] && account){
            loadBalances(exchange , tokens, account, dispatch)
        }
    }, [exchange , tokens , account])

    return (
      <div className='component exchange__transfers'>
        <div className='component__header flex-between'>
          <h2>Balance</h2>
          <div className='tabs'>
            <button className='tab tab--active'>Deposit</button>
            <button className='tab'>Withdraw</button>
          </div>
        </div>
  
        {/* Deposit/Withdraw Component 1 (LIQ) */}
  
        <div className='exchange__transfers--form'>
          <div className='flex-between'>
            <p><small>Token</small><br /><img src ={dapp} alt = "Token Logo" />{symbols && symbols[0]}</p>
            <p><small>Wallet</small><br />{tokenBalances && tokenBalances[0]}</p>
            <p><small>Exchange</small><br />{exchangeBalances && exchangeBalances[0]}</p>

          </div>
  
          <form onSubmit={(e) => depositHandler(e,tokens[0])}>
            <label htmlFor="token0">{symbols && symbols [0]} Amount</label>
            <input type="text" id='token0' placeholder='0.0000' onChange={(e) =>amountHandler(e , tokens[0])}/>
  
            <button className='button' type='submit'>
              <span>DEPOSIT</span>
            </button>
          </form>
        </div>
  
        <hr />
  
        {/* Deposit/Withdraw Component 2 (mETH) */}
  
        <div className='exchange__transfers--form'>
          <div className='flex-between'>
          <p><small>Token</small><br /><img src ={eth} alt = "Token Logo" />{symbols && symbols[1]}</p>
          <p><small>Wallet</small><br />{tokenBalances && tokenBalances[1]}</p>
          <p><small>Exchange</small><br />{exchangeBalances && exchangeBalances[1]}</p>

          </div>
  
          <form>
            <label htmlFor="token1">{symbols && symbols[1]} Amount</label>
            <input type="text" id='token1' placeholder='0.0000'/>
  
            <button className='button' type='submit'>
              <span></span>
            </button>
          </form>
        </div>
  
        <hr />
      </div>
    );
  }
  
  export default Balance;