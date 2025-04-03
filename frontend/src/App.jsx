import React, { useState, useEffect } from "react";
import web3 from "./utils/web3";
import didRegistry from "./utils/contract";
import Spinner from "./components/common/Spinner";
import Modal from "./components/common/Modal";
import WalletConnection from "./components/wallet/WalletConnection";
import DIDOperations from "./components/did/DIDOperations";
import NetworkStatus from "./components/common/NetworkStatus";

function App() {
  const [account, setAccount] = useState(null);
  const [error, setError] = useState(null);
  const [networkId, setNetworkId] = useState(null);
  const [isConnected, setIsConnected] = useState(false);
  const [modal, setModal] = useState({ isOpen: false, title: "", message: "", type: "info" });
  const [isLoading, setIsLoading] = useState(false);

  const HARDHAT_NETWORK_ID = '0x7A69'; // 31337 in hex

  const showModal = (title, message, type = "info") => {
    setModal({ isOpen: true, title, message, type });
  };

  const closeModal = () => {
    setModal({ isOpen: false, title: "", message: "", type: "info" });
  };

  const connectWallet = async () => {
    setIsLoading(true);
    try {
      if (!window.ethereum) {
        setError("MetaMask is required!");
        return;
      }
      console.log("Requesting accounts...");
      const accounts = await window.ethereum.request({ method: "eth_requestAccounts" });
      if (accounts.length === 0) {
        setError("No accounts found in MetaMask!");
        return;
      }
      setAccount(accounts[0]);
      setError(null);
      console.log("Connected account:", accounts[0]);

      const chainId = await window.ethereum.request({ method: 'eth_chainId' });
      if (chainId !== HARDHAT_NETWORK_ID) {
        setError("Please switch to Hardhat network in MetaMask!");
      }
    } catch (error) {
      setError("Error connecting to MetaMask: " + error.message);
      console.error("Error connecting:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const disconnectWallet = async () => {
    try {
      setAccount(null);
      setError(null);
      console.log("Wallet disconnected");
    } catch (error) {
      console.error("Error disconnecting wallet:", error);
    }
  };

  const switchToHardhat = async () => {
    setIsLoading(true);
    try {
      await window.ethereum.request({
        method: 'wallet_switchEthereumChain',
        params: [{ chainId: HARDHAT_NETWORK_ID }],
      });
      setNetworkId(HARDHAT_NETWORK_ID);
      setIsConnected(true);
      showModal("Success", "Successfully switched to Hardhat network", "success");
    } catch (error) {
      if (error.code === 4902) {
        try {
          await window.ethereum.request({
            method: 'wallet_addEthereumChain',
            params: [{
              chainId: HARDHAT_NETWORK_ID,
              chainName: 'Hardhat Local',
              nativeCurrency: {
                name: 'ETH',
                symbol: 'ETH',
                decimals: 18
              },
              rpcUrls: ['http://127.0.0.1:8545'],
            }],
          });
          setNetworkId(HARDHAT_NETWORK_ID);
          setIsConnected(true);
          showModal("Success", "Successfully added and switched to Hardhat network", "success");
        } catch (addError) {
          showModal("Error", `Failed to add Hardhat network: ${addError.message}`, "error");
        }
      } else {
        showModal("Error", `Failed to switch network: ${error.message}`, "error");
      }
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const checkNetwork = async () => {
      try {
        if (window.ethereum) {
          const chainId = await window.ethereum.request({ method: 'eth_chainId' });
          setNetworkId(chainId);
          setIsConnected(true);
          console.log("Current network chainId:", chainId);
        }
      } catch (error) {
        console.error("Error checking network:", error);
        setIsConnected(false);
      }
    };
    
    checkNetwork();

    if (window.ethereum) {
      window.ethereum.on('chainChanged', (chainId) => {
        console.log("Network changed to:", chainId);
        setNetworkId(chainId);
        setIsConnected(true);
      });

      window.ethereum.on('accountsChanged', (accounts) => {
        if (accounts.length === 0) {
          setAccount(null);
          setIsConnected(false);
          console.log("Wallet disconnected");
        } else {
          setAccount(accounts[0]);
          setIsConnected(true);
          console.log("Account changed to:", accounts[0]);
        }
      });

      window.ethereum.on('disconnect', () => {
        setIsConnected(false);
        console.log("Wallet disconnected");
      });
    }
  }, []);

  const registerDID = async () => {
    if (!account) {
      setError("Please connect MetaMask first!");
      return;
    }

    setIsLoading(true);
    try {
      console.log("Attempting to register DID...");
      console.log("Current account:", account);
      console.log("Current network:", networkId);
      console.log("Contract methods available:", Object.keys(didRegistry.methods));
      console.log("Contract address:", didRegistry._address);
      
      try {
        console.log("Checking for existing DID...");
        const existingDID = await didRegistry.methods.getDID(account).call();
        console.log("Existing DID:", existingDID);
        if (existingDID && existingDID !== '') {
          showModal(
            "DID Already Registered",
            `Your account already has a registered DID: ${existingDID}`,
            "info"
          );
          return;
        }
      } catch (checkError) {
        console.log("Error checking existing DID:", checkError);
        if (!checkError.message.includes("DID not found")) {
          throw checkError;
        }
      }
      
      const did = `did:example:${account}`;
      console.log("Sending transaction with DID:", did);
      
      try {
        console.log("Estimating gas...");
        const gasEstimate = await didRegistry.methods.registerDID(did).estimateGas({ from: account });
        console.log("Gas estimate:", gasEstimate);
        
        console.log("Sending transaction...");
        const tx = await didRegistry.methods.registerDID(did).send({ 
          from: account,
          gas: gasEstimate
        });
        
        console.log("Transaction receipt:", tx);
        setError(null);
        console.log("DID Registered:", did);
        showModal(
          "DID Registration Successful",
          `Your DID has been registered: ${did}`,
          "success"
        );
      } catch (contractError) {
        console.log("Contract interaction error:", contractError);
        if (contractError.message.includes("DID already registered")) {
          showModal(
            "DID Already Registered",
            "This DID is already registered for your account",
            "error"
          );
        } else {
          console.error("Contract interaction error:", contractError);
          showModal(
            "Registration Error",
            `Failed to register DID: ${contractError.message}`,
            "error"
          );
        }
      }
    } catch (error) {
      console.log("Error in registerDID:", error);
      showModal(
        "Error",
        `Failed to register DID: ${error.message}`,
        "error"
      );
      console.error("Error registering DID:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const getDID = async () => {
    if (!account) {
      setError("Please connect MetaMask first!");
      return;
    }

    setIsLoading(true);
    try {
      console.log("Attempting to get DID...");
      console.log("Current account:", account);
      console.log("Current network:", networkId);
      console.log("Contract methods available:", Object.keys(didRegistry.methods));
      console.log("Contract address:", didRegistry._address);
      
      console.log("Calling getDID method...");
      const did = await didRegistry.methods.getDID(account).call();
      console.log("Retrieved DID:", did);
      if (did && did !== '') {
        showModal(
          "DID Found",
          `Your registered DID is: ${did}`,
          "success"
        );
      } else {
        showModal(
          "No DID Found",
          "You don't have a registered DID yet.",
          "info"
        );
      }
    } catch (error) {
      console.log("Error in getDID:", error);
      if (error.message.includes("DID not found")) {
        showModal(
          "No DID Found",
          "You don't have a registered DID yet.",
          "info"
        );
      } else {
        showModal(
          "Error",
          `Failed to get DID: ${error.message}`,
          "error"
        );
      }
      console.error("Error getting DID:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-gray-900">DID Identity Management</h1>
        </div>
      </header>

      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="px-4 py-5 sm:p-6">
              {error && (
                <div className="mb-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded">
                  {error}
                </div>
              )}

              <div className="space-y-4">
                <NetworkStatus
                  networkId={networkId}
                  isConnected={isConnected}
                  onSwitchNetwork={switchToHardhat}
                />

                <WalletConnection
                  account={account}
                  isLoading={isLoading}
                  error={error}
                  onConnect={connectWallet}
                  onDisconnect={disconnectWallet}
                />

                <DIDOperations
                  account={account}
                  isLoading={isLoading}
                  onRegisterDID={registerDID}
                  onGetDID={getDID}
                />
              </div>
            </div>
          </div>
        </div>
      </main>

      {isLoading && <Spinner />}
      <Modal
        isOpen={modal.isOpen}
        onClose={closeModal}
        title={modal.title}
        message={modal.message}
        type={modal.type}
      />
    </div>
  );
}

export default App;