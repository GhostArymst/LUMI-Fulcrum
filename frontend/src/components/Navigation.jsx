import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useWallet } from '../context/WalletContext';
import { useTheme } from '../context/ThemeContext';
import NetworkStatus from './NetworkStatus';

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const { account, networkId, isConnected, connectWallet, disconnectWallet, switchToHardhat } = useWallet();
  const { isDarkMode, toggleTheme } = useTheme();
  const isDashboard = location.pathname === '/dashboard';
  const HARDHAT_NETWORK_ID = '0x7A69'; // 31337 in hex

  const isActive = (path) => {
    return location.pathname === path;
  };

  return (
    <nav className="bg-white dark:bg-gray-800 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link to="/" className="text-2xl font-bold text-gray-900 dark:text-white hover:text-gray-700 dark:hover:text-gray-200 transition-colors">
              LUMI
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex md:items-center md:space-x-8">
            {/* Main Links */}
            <div className="flex items-center space-x-6">
              <Link
                to="/"
                className={`${
                  isActive('/')
                    ? 'text-gray-900 dark:text-white font-medium'
                    : 'text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white'
                } text-sm transition-colors`}
              >
                Home
              </Link>
              <Link
                to="/dashboard"
                className={`${
                  isActive('/dashboard')
                    ? 'text-gray-900 dark:text-white font-medium'
                    : 'text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white'
                } text-sm transition-colors`}
              >
                Dashboard
              </Link>
              <Link
                to="/profile"
                className={`${
                  isActive('/profile')
                    ? 'text-gray-900 dark:text-white font-medium'
                    : 'text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white'
                } text-sm transition-colors`}
              >
                Profile
              </Link>
            </div>

            {/* Right Side Actions */}
            <div className="flex items-center space-x-4">
              <NetworkStatus
                networkId={networkId}
                isConnected={isConnected}
              />
              {networkId !== HARDHAT_NETWORK_ID && (
                <button
                  onClick={switchToHardhat}
                  className="px-3 py-1.5 text-sm text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors"
                >
                  Switch to Hardhat
                </button>
              )}
              {account ? (
                <button
                  onClick={disconnectWallet}
                  className="px-3 py-1.5 text-sm text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors"
                >
                  Disconnect
                </button>
              ) : (
                <button
                  onClick={connectWallet}
                  className="px-3 py-1.5 text-sm text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors"
                >
                  Connect
                </button>
              )}
              <button
                onClick={toggleTheme}
                className="p-2 rounded-full text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-gray-900 dark:hover:text-white transition-colors"
                aria-label={isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'}
              >
                {isDarkMode ? (
                  <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
                    />
                  </svg>
                ) : (
                  <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
                    />
                  </svg>
                )}
              </button>
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-gray-900 dark:hover:text-white transition-colors"
            >
              <span className="sr-only">Open main menu</span>
              {!isOpen ? (
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              ) : (
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <div className={`${isOpen ? 'block' : 'hidden'} md:hidden border-t border-gray-200 dark:border-gray-700`}>
        <div className="px-2 pt-2 pb-3 space-y-1">
          <Link
            to="/"
            className={`${
              isActive('/')
                ? 'text-gray-900 dark:text-white font-medium'
                : 'text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white'
            } block px-3 py-2 text-base transition-colors`}
          >
            Home
          </Link>
          <Link
            to="/dashboard"
            className={`${
              isActive('/dashboard')
                ? 'text-gray-900 dark:text-white font-medium'
                : 'text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white'
            } block px-3 py-2 text-base transition-colors`}
          >
            Dashboard
          </Link>
          <Link
            to="/profile"
            className={`${
              isActive('/profile')
                ? 'text-gray-900 dark:text-white font-medium'
                : 'text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white'
            } block px-3 py-2 text-base transition-colors`}
          >
            Profile
          </Link>
          <div className="px-3 py-2">
            <NetworkStatus
              networkId={networkId}
              isConnected={isConnected}
            />
          </div>
          {networkId !== HARDHAT_NETWORK_ID && (
            <button
              onClick={switchToHardhat}
              className="w-full text-left px-3 py-2 text-base text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors"
            >
              Switch to Hardhat
            </button>
          )}
          {account ? (
            <button
              onClick={disconnectWallet}
              className="w-full text-left px-3 py-2 text-base text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors"
            >
              Disconnect
            </button>
          ) : (
            <button
              onClick={connectWallet}
              className="w-full text-left px-3 py-2 text-base text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors"
            >
              Connect
            </button>
          )}
          <button
            onClick={toggleTheme}
            className="w-full text-left px-3 py-2 text-base text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors"
          >
            {isDarkMode ? 'Light Mode' : 'Dark Mode'}
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navigation; 