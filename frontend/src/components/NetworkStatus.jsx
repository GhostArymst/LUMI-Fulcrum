import React from 'react';

const NetworkStatus = ({ networkId, isConnected }) => {
  const getNetworkName = (id) => {
    switch (id) {
      case '0x1':
        return 'Ethereum Mainnet';
      case '0x5':
        return 'Goerli Testnet';
      case '0x7A69': // 31337 in hex
        return 'Hardhat Local';
      default:
        return 'Unknown Network';
    }
  };

  const getNetworkColor = (id) => {
    switch (id) {
      case '0x1':
        return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
      case '0x5':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200';
      case '0x7A69':
        return 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200';
    }
  };

  if (!isConnected) {
    return (
      <div className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200">
        <span className="w-2 h-2 mr-2 bg-red-500 rounded-full"></span>
        Not Connected
      </div>
    );
  }

  return (
    <div className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${getNetworkColor(networkId)}`}>
      <span className={`w-2 h-2 mr-2 rounded-full ${
        networkId === '0x1' ? 'bg-green-500' :
        networkId === '0x5' ? 'bg-blue-500' :
        networkId === '0x7A69' ? 'bg-purple-500' :
        'bg-gray-500'
      }`}></span>
      {getNetworkName(networkId)}
    </div>
  );
};

export default NetworkStatus; 