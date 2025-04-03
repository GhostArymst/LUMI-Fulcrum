import React from 'react';

const DIDOperations = ({ account, isLoading, onRegisterDID, onGetDID }) => {
  return (
    <div className="border-t border-gray-200 pt-4">
      <h2 className="text-lg font-medium text-gray-900">DID Operations</h2>
      <div className="mt-4 flex space-x-3">
        <button
          onClick={onRegisterDID}
          disabled={!account || isLoading}
          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:opacity-50"
        >
          Register DID
        </button>
        <button
          onClick={onGetDID}
          disabled={!account || isLoading}
          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
        >
          Get DID
        </button>
      </div>
    </div>
  );
};

export default DIDOperations;