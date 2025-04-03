import React, { useState } from 'react';
import { useWallet } from '../context/WalletContext';
import { useActivity } from '../context/ActivityContext';
import Modal from './common/Modal';
import Spinner from './common/Spinner';

const DIDManagement = () => {
  const { account, didRegistry, isLoading } = useWallet();
  const { addActivity } = useActivity();
  const [showModal, setShowModal] = useState(false);
  const [modalTitle, setModalTitle] = useState('');
  const [modalMessage, setModalMessage] = useState('');
  const [modalType, setModalType] = useState('info');

  const handleModalClose = () => {
    setShowModal(false);
  };

  const registerDID = async () => {
    if (!account) {
      setModalTitle('Error');
      setModalMessage('Please connect your wallet first');
      setModalType('error');
      setShowModal(true);
      return;
    }

    try {
      // Check if DID already exists
      const existingDID = await didRegistry.methods.getDID(account).call();
      if (existingDID) {
        setModalTitle('Info');
        setModalMessage(`You have already registered a DID: ${existingDID}`);
        setModalType('info');
        setShowModal(true);
        return;
      }

      const did = `did:example:${account}`;
      const tx = await didRegistry.methods.registerDID(did).send({ from: account });
      
      setModalTitle('Success');
      setModalMessage(`DID registered successfully: ${did}`);
      setModalType('success');
      setShowModal(true);

      addActivity({
        type: 'DID_REGISTER',
        message: `Registered DID: ${did}`,
        txHash: tx.transactionHash,
        timestamp: new Date().toISOString()
      });
    } catch (error) {
      if (error.code === 4001 || error.message.includes('User denied transaction')) {
        setModalTitle('Info');
        setModalMessage('Action cancelled by user');
        setModalType('info');
      } else {
        setModalTitle('Error');
        setModalMessage(`Failed to register DID: ${error.message}`);
        setModalType('error');
      }
      setShowModal(true);
    }
  };

  const getDID = async () => {
    if (!account) {
      setModalTitle('Error');
      setModalMessage('Please connect your wallet first');
      setModalType('error');
      setShowModal(true);
      return;
    }

    try {
      const did = await didRegistry.methods.getDID(account).call();
      if (did) {
        setModalTitle('Success');
        setModalMessage(`Your DID: ${did}`);
        setModalType('success');
        setShowModal(true);

        addActivity({
          type: 'DID_GET',
          message: `Retrieved DID: ${did}`,
          timestamp: new Date().toISOString()
        });
      } else {
        setModalTitle('Info');
        setModalMessage('No DID registered for this account');
        setModalType('info');
        setShowModal(true);
      }
    } catch (error) {
      if (error.code === 4001 || error.message.includes('User denied transaction')) {
        setModalTitle('Info');
        setModalMessage('Action cancelled by user');
        setModalType('info');
      } else {
        setModalTitle('Error');
        setModalMessage(`Failed to get DID: ${error.message}`);
        setModalType('error');
      }
      setShowModal(true);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
        <Spinner />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-6">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">DID Management</h2>
          
          {!account ? (
            <div className="text-center">
              <p className="text-gray-600 dark:text-gray-300">Please connect your wallet to manage DIDs</p>
            </div>
          ) : (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row gap-4">
                <button
                  onClick={registerDID}
                  className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                >
                  Register DID
                </button>
                <button
                  onClick={getDID}
                  className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                >
                  Get DID
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      <Modal
        isOpen={showModal}
        onClose={handleModalClose}
        title={modalTitle}
        message={modalMessage}
        type={modalType}
      />
    </div>
  );
};

export default DIDManagement; 