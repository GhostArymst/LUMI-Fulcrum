import React from 'react';

const NetworkStatus = ({ networkId, isConnected, onSwitchNetwork }) => {
  const getNetworkName = (chainId) => {
    switch (chainId) {
      case '0x7A69': // 31337 in hex
        return 'Hardhat Local';
      case '0x1':
        return 'Ethereum Mainnet';
      case '0x5':
        return 'Goerli Testnet';
      case '0xaa36a7': // 11155111 in hex
        return 'Sepolia Testnet';
      default:
        return `Unknown Network (${chainId})`;
    }
  };

  const getNetworkColor = (chainId) => {
    switch (chainId) {
      case '0x7A69':
        return 'bg-purple-100 text-purple-800';
      case '0x1':
        return 'bg-green-100 text-green-800';
      case '0x5':
        return 'bg-blue-100 text-blue-800';
      case '0xaa36a7':
        return 'bg-orange-100 text-orange-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="flex items-center justify-between p-4 bg-white rounded-lg shadow">
      <div className="flex items-center space-x-3">
        <div className={`flex items-center px-3 py-1 rounded-full text-sm font-medium ${getNetworkColor(networkId)}`}>
          <span className={`w-2 h-2 rounded-full mr-2 ${isConnected ? 'bg-green-500' : 'bg-red-500'}`}></span>
          {getNetworkName(networkId)}
        </div>
        <span className="text-sm text-gray-500">Chain ID: {networkId}</span>
      </div>
      
      {networkId !== '0x7A69' && (
        <button
          onClick={onSwitchNetwork}
          className="px-4 py-2 text-sm font-medium text-white bg-purple-600 rounded-md hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
        >
          Switch to Hardhat
        </button>
      )}
    </div>
  );
};

export default NetworkStatus;