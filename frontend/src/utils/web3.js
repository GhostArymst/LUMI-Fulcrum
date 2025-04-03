import Web3 from 'web3';

const initializeWeb3 = () => {
  console.log('Initializing Web3...');
  
  if (typeof window !== 'undefined' && window.ethereum) {
    console.log('MetaMask is available');
    try {
      const web3 = new Web3(window.ethereum);
      console.log('Web3 instance created successfully');
      
      // Test connection
      web3.eth.getChainId()
        .then(chainId => {
          console.log('Connected to chain ID:', chainId);
        })
        .catch(error => {
          console.error('Failed to get chain ID:', error);
        });
      
      return web3;
    } catch (error) {
      console.error('Error creating Web3 instance:', error);
      throw error;
    }
  } else {
    console.error('MetaMask is not available');
    throw new Error('MetaMask is required to use this application');
  }
};

const web3 = initializeWeb3();
export default web3;