import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-white dark:bg-gray-800">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Company Info */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">LUMI</h3>
            <p className="text-gray-700 dark:text-gray-300">
              A decentralized identity management system that puts you in control of your digital identity.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/dashboard" className="text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white">
                  Dashboard
                </Link>
              </li>
              <li>
                <Link to="/profile" className="text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white">
                  Profile
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Contact</h3>
            <ul className="space-y-2">
              <li className="text-gray-700 dark:text-gray-300">
                <a href="mailto:contact@lumi.com" className="hover:text-gray-900 dark:hover:text-white">
                  contact@lumi.com
                </a>
              </li>
              <li className="text-gray-700 dark:text-gray-300">
                <a href="https://twitter.com/lumi" className="hover:text-gray-900 dark:hover:text-white">
                  @lumi
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-8 pt-8 border-t border-gray-200 dark:border-gray-700">
          <p className="text-center text-gray-700 dark:text-gray-400">
            © {new Date().getFullYear()} LUMI. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 