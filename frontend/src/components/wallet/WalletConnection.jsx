import React from 'react';

const WalletConnection = ({ account, isLoading, error, onConnect, onDisconnect }) => {
  return (
    <div className="flex items-center justify-between">
      <div>
        <h2 className="text-lg font-medium text-gray-900">Wallet Connection</h2>
        <p className="mt-1 text-sm text-gray-500">
          {account ? `Connected: ${account}` : 'Not connected'}
        </p>
      </div>
      <div className="flex space-x-3">
        {!account ? (
          <button
            onClick={onConnect}
            disabled={isLoading}
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
          >
            Connect Wallet
          </button>
        ) : (
          <button
            onClick={onDisconnect}
            disabled={isLoading}
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 disabled:opacity-50"
          >
            Disconnect
          </button>
        )}
      </div>
    </div>
  );
};

export default WalletConnection;