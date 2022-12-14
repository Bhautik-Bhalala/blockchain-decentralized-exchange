import React from 'react';
import { useEffect } from 'react';
import config from '../config.json';
import { useDispatch } from 'react-redux';
import {
  loadProvider,
  loadNetwork,
  loadAccount,
  loadTokens,
  loadExchange,
  loadAllOrders,
  subscribeToEvents
} from '../store/interactions';

import Navbar from './Navbar';
import Markets from './Markets';
import Balance from './Balance';
import Order from './Order';
import OrderBook from './OrderBook';
import PriceChart from './PriceChart';




function App() {     
  const dispatch = useDispatch()

  const loadBlockchainData = async () => {
        // Connect Ethers to blockchain
        const provider = loadProvider(dispatch)

        // Fetch current network's chainId (e.g. hardhat: 31337, kovan: 42)
        const chainId = await loadNetwork(provider, dispatch)
    
        // Fetch current account & balance from Metamask when Changed
        // await loadAccount(provider, dispatch)
        window.ethereum.on('accountsChanged',async () =>{
          await loadAccount(provider, dispatch)
        })
        window.ethereum.on('chainChanged', () => {
          window.location.reload()
        })
    
        // Load token smart contracts
        const LIQ = config[chainId].LIQ
        const mETH = config[chainId].mETH
        await loadTokens(provider, [LIQ.address, mETH.address], dispatch)
    
        // Load exchange smart contract
        const exchangeConfig = config[chainId].exchange
        const exchange = await loadExchange(provider, exchangeConfig.address, dispatch)
        
        
        // Fetch all orders: open, filled, cancelled
        loadAllOrders(provider, exchange, dispatch)

        //Listen to events
        subscribeToEvents(exchange , dispatch)

  }

  useEffect(()=>{
    loadBlockchainData()
  })

  return (
    <div>

      <Navbar />

      <main className='exchange grid'>
        <section className='exchange__section--left grid'>

          <Markets />

          <Balance />

          <Order />

        </section>
        <section className='exchange__section--right grid'>

        <PriceChart />

          {/* Transactions */}

          {/* Trades */}

          <OrderBook/>
        </section>
      </main>

      {/* Alert */}

    </div>
  );
}

export default App;