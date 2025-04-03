import Web3 from 'web3';

let web3;

if (window.ethereum) {
  web3 = new Web3(window.ethereum);
} else if (window.web3) {
  web3 = new Web3(window.web3.currentProvider);
} else {
  console.log('Non-Ethereum browser detected. Consider installing MetaMask!');
}

export default web3;