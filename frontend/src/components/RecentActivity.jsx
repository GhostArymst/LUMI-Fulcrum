import React from 'react';
import { useActivity } from '../context/ActivityContext';

const RecentActivity = () => {
  const { activities, clearActivities } = useActivity();

  const formatDate = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleString();
  };

  const getActivityIcon = (type) => {
    switch (type) {
      case 'DID_REGISTER':
        return '📝';
      case 'DID_GET':
        return '🔍';
      case 'WALLET_CONNECT':
        return '🔗';
      case 'WALLET_DISCONNECT':
        return '🔌';
      default:
        return '⚡';
    }
  };

  const getActivityColor = (type) => {
    switch (type) {
      case 'DID_REGISTER':
        return 'bg-green-100 text-green-800';
      case 'DID_GET':
        return 'bg-blue-100 text-blue-800';
      case 'WALLET_CONNECT':
        return 'bg-purple-100 text-purple-800';
      case 'WALLET_DISCONNECT':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
      <div className="px-4 py-6 sm:px-0">
        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="px-4 py-5 sm:p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold text-gray-900">Recent Activity</h2>
              {activities.length > 0 && (
                <button
                  onClick={clearActivities}
                  className="text-sm text-gray-500 hover:text-gray-700"
                >
                  Clear History
                </button>
              )}
            </div>

            {activities.length === 0 ? (
              <div className="text-center py-4 text-gray-500">
                No recent activity
              </div>
            ) : (
              <div className="space-y-4">
                {activities.map((activity) => (
                  <div
                    key={activity.id}
                    className="flex items-start space-x-3 p-3 rounded-lg border border-gray-200"
                  >
                    <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${getActivityColor(activity.type)}`}>
                      {getActivityIcon(activity.type)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900">
                        {activity.message}
                      </p>
                      <p className="text-xs text-gray-500">
                        {formatDate(activity.timestamp)}
                      </p>
                      {activity.txHash && (
                        <a
                          href={`https://sepolia.etherscan.io/tx/${activity.txHash}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-xs text-indigo-600 hover:text-indigo-500"
                        >
                          View on Etherscan
                        </a>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecentActivity; 