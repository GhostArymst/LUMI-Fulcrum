import web3 from './web3';
import DIDRegistry from '../contracts/DIDRegistry.json';

// Replace this with the address displayed in the console after deployment
const contractAddress = '0x5FbDB2315678afecb367f032d93F642f64180aa3';

const initializeContract = () => {
  if (!web3) {
    throw new Error('Web3 is not initialized. Please check your MetaMask connection.');
  }

  if (!contractAddress) {
    throw new Error('Contract address is not set. Please deploy the contract first.');
  }

  if (!DIDRegistry || !DIDRegistry.abi) {
    throw new Error('DIDRegistry ABI is not available. Please check the contract compilation.');
  }

  console.log('Initializing DIDRegistry contract...');
  console.log('Contract address:', contractAddress);
  console.log('Contract ABI length:', DIDRegistry.abi.length);

  try {
    const didRegistry = new web3.eth.Contract(
      DIDRegistry.abi,
      contractAddress
    );

    // Validate contract initialization
    if (!didRegistry || !didRegistry.methods) {
      throw new Error('Contract initialization failed - methods not available');
    }

    console.log('Contract initialized successfully');
    console.log('Available methods:', Object.keys(didRegistry.methods));

    return didRegistry;
  } catch (error) {
    console.error('Error initializing contract:', error);
    if (error.message.includes('Invalid JSON RPC response')) {
      throw new Error('Failed to connect to the blockchain. Please check your network connection and MetaMask.');
    }
    throw error;
  }
};

const didRegistry = initializeContract();
export default didRegistry;