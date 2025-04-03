import React, { createContext, useState, useContext, useEffect } from 'react';
import { initializeContract } from '../utils/contract';
import web3 from '../utils/web3';

const WalletContext = createContext();

export const WalletProvider = ({ children }) => {
  const [account, setAccount] = useState(null);
  const [error, setError] = useState(null);
  const [networkId, setNetworkId] = useState(null);
  const [isConnected, setIsConnected] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [didRegistry, setDidRegistry] = useState(null);

  const HARDHAT_NETWORK_ID = '0x7A69'; // 31337 in hex

  const handleAccountsChanged = (accounts) => {
    if (accounts.length === 0) {
      setAccount(null);
      setError("Please connect to MetaMask.");
    } else if (accounts[0] !== account) {
      setAccount(accounts[0]);
      initializeContract().then(contract => {
        setDidRegistry(contract);
      }).catch(error => {
        console.error("Error re-initializing contract:", error);
        setError(error.message);
      });
    }
  };

  const handleChainChanged = (chainId) => {
    setNetworkId(chainId);
    if (chainId !== HARDHAT_NETWORK_ID) {
      setError("Please switch to Hardhat network!");
    } else {
      setError(null);
      initializeContract().then(contract => {
        setDidRegistry(contract);
      }).catch(error => {
        console.error("Error re-initializing contract:", error);
        setError(error.message);
      });
    }
  };

  const connectWallet = async () => {
    try {
      if (window.ethereum) {
        await window.ethereum.request({
          method: 'wallet_requestPermissions',
          params: [{ eth_accounts: {} }]
        });
        
        const accounts = await window.ethereum.request({ 
          method: 'eth_requestAccounts',
          params: [{ force: true }]
        });
        
        const chainId = await window.ethereum.request({ method: 'eth_chainId' });
        
        setAccount(accounts[0]);
        setNetworkId(chainId);
        setError(null);
        
        const contract = await initializeContract();
        setDidRegistry(contract);
        
        window.ethereum.on('accountsChanged', handleAccountsChanged);
        window.ethereum.on('chainChanged', handleChainChanged);
      } else {
        setError("Please install MetaMask!");
      }
    } catch (error) {
      console.error("Error connecting wallet:", error);
      setError(error.message);
    }
  };

  const disconnectWallet = async () => {
    try {
      setAccount(null);
      setError(null);
      console.log("Wallet disconnected");
    } catch (error) {
      console.error("Error disconnecting wallet:", error);
    }
  };

  const switchToHardhat = async () => {
    setIsLoading(true);
    try {
      await window.ethereum.request({
        method: 'wallet_switchEthereumChain',
        params: [{ chainId: HARDHAT_NETWORK_ID }],
      });
      setNetworkId(HARDHAT_NETWORK_ID);
      setIsConnected(true);
    } catch (error) {
      if (error.code === 4902) {
        try {
          await window.ethereum.request({
            method: 'wallet_addEthereumChain',
            params: [{
              chainId: HARDHAT_NETWORK_ID,
              chainName: 'Hardhat Local',
              nativeCurrency: {
                name: 'ETH',
                symbol: 'ETH',
                decimals: 18
              },
              rpcUrls: ['http://127.0.0.1:8545'],
            }],
          });
          setNetworkId(HARDHAT_NETWORK_ID);
          setIsConnected(true);
        } catch (addError) {
          setError(`Failed to add Hardhat network: ${addError.message}`);
        }
      } else {
        setError(`Failed to switch network: ${error.message}`);
      }
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const checkNetwork = async () => {
      try {
        if (window.ethereum) {
          const chainId = await window.ethereum.request({ method: 'eth_chainId' });
          setNetworkId(chainId);
          setIsConnected(true);
        }
      } catch (error) {
        console.error("Error checking network:", error);
        setIsConnected(false);
      }
    };
    
    checkNetwork();
  }, []);

  return (
    <WalletContext.Provider
      value={{
        account,
        error,
        networkId,
        isConnected,
        isLoading,
        didRegistry,
        connectWallet,
        disconnectWallet,
        switchToHardhat,
        setIsLoading
      }}
    >
      {children}
    </WalletContext.Provider>
  );
};

export const useWallet = () => {
  const context = useContext(WalletContext);
  if (!context) {
    throw new Error('useWallet must be used within a WalletProvider');
  }
  return context;
}; 