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
      throw new Error("Contract address not found in environment variables");
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
      const testCall = await contract.methods.getDID(accounts[0]).call();
      console.log("Contract test call successful:", testCall);
    } catch (testError) {
      console.error("Contract test call failed:", testError);
      throw new Error(`Contract not accessible: ${testError.message}`);
    }
    
    return contract;
  } catch (error) {
    console.error("Error initializing contract:", error);
    throw error;
  }
};

const didRegistry = await initializeContract();
export default didRegistry;