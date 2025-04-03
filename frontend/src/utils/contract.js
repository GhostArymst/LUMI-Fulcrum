import web3 from './web3';
import DIDRegistry from '../contracts/DIDRegistry.json';

const contractAddress = '0x5FbDB2315678afecb367f032d93F642f64180aa3'; // Replace with your deployed contract address

const didRegistry = new web3.eth.Contract(
  DIDRegistry.abi,
  contractAddress
);

export default didRegistry;