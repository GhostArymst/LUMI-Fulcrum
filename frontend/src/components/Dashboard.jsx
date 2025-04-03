import React from 'react';
import { Link } from 'react-router-dom';
import { useWallet } from '../context/WalletContext';
import Spinner from './common/Spinner';

const Dashboard = () => {
  const { account, isLoading, error } = useWallet();

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
        <Spinner />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-red-600 dark:text-red-400 mb-4">Error</h2>
          <p className="text-gray-600 dark:text-gray-300">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">Welcome to LUMI</h1>
        
        {!account ? (
          <div className="text-center">
            <h2 className="text-xl font-semibold text-gray-700 dark:text-gray-300 mb-4">
              Please connect your wallet to get started
            </h2>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            <Link
              to="/did-management"
              className="block p-6 bg-white dark:bg-gray-800 rounded-lg shadow hover:shadow-lg transition-shadow duration-300"
            >
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">DID Management</h3>
              <p className="text-gray-500 dark:text-gray-400">
                Register and manage your Decentralized Identifiers
              </p>
            </Link>

            <Link
              to="/activity"
              className="block p-6 bg-white dark:bg-gray-800 rounded-lg shadow hover:shadow-lg transition-shadow duration-300"
            >
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">Recent Activity</h3>
              <p className="text-gray-500 dark:text-gray-400">
                View your recent transactions and activities
              </p>
            </Link>

            <div className="block p-6 bg-white dark:bg-gray-800 rounded-lg shadow">
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">Account Info</h3>
              <p className="text-gray-500 dark:text-gray-400 break-all">
                Connected Account: {account}
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard; 