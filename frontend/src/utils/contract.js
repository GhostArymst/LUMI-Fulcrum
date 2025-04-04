import DIDRegistry from '../contracts/DIDRegistry.json';
import web3 from './web3';

export const initializeContract = async () => {
  try {
    console.log("Initializing contract...");
    
    // Check if web3 is initialized
    if (!web3) {
      throw new Error("Web3 is not initialized");
    }
    
    // Get network ID
    const networkId = await web3.eth.net.getId();
    console.log("Current network ID:", networkId);
    
    // Get accounts
    const accounts = await web3.eth.getAccounts();
    console.log("Available accounts:", accounts);
    
    // Get contract address from environment
    const contractAddress = import.meta.env.VITE_CONTRACT_ADDRESS;
    console.log("Contract address from env:", contractAddress);
    
    if (!contractAddress) {
      console.warn("Contract address not found in environment variables");
      return null;
    }
    
    // Get contract ABI
    const contractABI = DIDRegistry.abi;
    console.log("Contract ABI length:", contractABI.length);
    
    // Create contract instance
    const contract = new web3.eth.Contract(contractABI, contractAddress);
    console.log("Contract instance created");
    
    // Test contract accessibility
    try {
      console.log("Testing contract accessibility...");
      if (accounts.length > 0) {
        // Check if contract is deployed
        const code = await web3.eth.getCode(contractAddress);
        if (code === '0x') {
          console.warn("Contract not deployed at this address");
          return null;
        }
        console.log("Contract is deployed and accessible");
      } else {
        console.log("No accounts available for test call");
      }
    } catch (testError) {
      console.warn("Contract test call failed:", testError);
      return null;
    }
    
    return contract;
  } catch (error) {
    console.error("Error initializing contract:", error);
    return null;
  }
};

// Initialize contract only if web3 is available
let didRegistry;
if (typeof window !== 'undefined' && window.ethereum) {
  didRegistry = initializeContract().catch(error => {
    console.error("Failed to initialize contract:", error);
    return null;
  });
}

export default didRegistry;