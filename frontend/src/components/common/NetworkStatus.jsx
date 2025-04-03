import React from 'react';

const NetworkStatus = ({ networkId, isConnected }) => {
  const getNetworkName = (id) => {
    switch (id) {
      case '0x1':
        return 'Ethereum Mainnet';
      case '0x5':
        return 'Goerli Testnet';
      case '0x7A69':
        return 'Hardhat';
      default:
        return 'Unknown Network';
    }
  };

  return (
    <div className="flex items-center space-x-2">
      <div className="flex items-center space-x-2 px-3 py-2 rounded-lg bg-gray-100 dark:bg-gray-700">
        <div className={`w-2 h-2 rounded-full ${isConnected ? 'bg-green-500' : 'bg-red-500'}`} />
        <span className="text-sm text-gray-600 dark:text-gray-300">
          {isConnected ? getNetworkName(networkId) : 'Not Connected'}
        </span>
        {isConnected && (
          <span className="text-xs text-gray-500 dark:text-gray-400">
            ({networkId})
          </span>
        )}
      </div>
    </div>
  );
};

export default NetworkStatus;