import logo from '../assets/logo.png'
import { useSelector } from 'react-redux';

const Navbar = () => {
    const account = useSelector(state => state.provider.account)
    const balance = useSelector(state => state.provider.balance)

    return(
      <div className='exchange__header grid'>
        <div className='exchange__header--brand flex'>
            <img src = {logo} className='logo' alt='DApp Logo'></img>
            <h1>Liquidy Token Exchange</h1>
  
        </div>
  
        <div className='exchange__header--networks flex'>

  
        </div>
        
  
        <div className='exchange__header--account flex'>

            { balance ? 
                (<p><small>My Balance</small>{Number(balance).toFixed(4)}</p>) 
                : (<p><small>My Balance</small> 0 ETH</p>)
            }
            {account ? 
                (<a href = "">
                    {account.slice(0,5)+'...'+account.slice(38,42)}
                </a>) 
                : (<a href = ""></a>)
            }

            
        </div>
      </div>
    )
  }
  
  export default Navbar;