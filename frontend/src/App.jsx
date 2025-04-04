import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { WalletProvider, useWallet } from "./context/WalletContext";
import { ActivityProvider, useActivity } from "./context/ActivityContext";
import { ThemeProvider } from "./context/ThemeContext";
import Spinner from "./components/common/Spinner";
import Modal from "./components/common/Modal";
import Navigation from "./components/Navigation";
import LandingPage from "./components/LandingPage";
import Dashboard from "./components/Dashboard";
import DIDManagement from "./components/DIDManagement";
import RecentActivity from "./components/RecentActivity";
import Footer from "./components/Footer";
import Home from './components/Home';
import UserTypeSelection from './components/UserTypeSelection';
import BusinessRegistration from './components/BusinessRegistration';
import FreelancerRegistration from './components/FreelancerRegistration';
import './styles/dark-mode.css';

// Main App component
const AppContent = () => {
  const [modal, setModal] = useState({ isOpen: false, title: "", message: "", type: "info" });
  const { account, error, isLoading, didRegistry, setIsLoading } = useWallet();
  const { addActivity } = useActivity();

  const showModal = (title, message, type = "info") => {
    setModal({ isOpen: true, title, message, type });
  };

  const closeModal = () => {
    setModal({ isOpen: false, title: "", message: "", type: "info" });
  };

  const registerDID = async () => {
    if (!account) {
      showModal("Error", "Please connect MetaMask first!", "error");
      return;
    }

    setIsLoading(true);
    try {
      const did = `did:example:${account}`;
      const tx = await didRegistry.methods.registerDID(did).send({ from: account });
      showModal("Success", `DID registered: ${did}`, "success");
      addActivity({
        type: 'DID_REGISTER',
        message: `Registered DID: ${did}`,
        txHash: tx.transactionHash
      });
    } catch (error) {
      showModal("Error", `Failed to register DID: ${error.message}`, "error");
    } finally {
      setIsLoading(false);
    }
  };

  const getDID = async () => {
    if (!account) {
      showModal("Error", "Please connect MetaMask first!", "error");
      return;
    }

    setIsLoading(true);
    try {
      const did = await didRegistry.methods.getDID(account).call();
      if (did) {
        showModal("Success", `Your DID: ${did}`, "success");
        addActivity({
          type: 'DID_GET',
          message: `Retrieved DID: ${did}`
        });
      } else {
        showModal("Info", "No DID registered for this account", "info");
      }
    } catch (error) {
      showModal("Error", `Failed to get DID: ${error.message}`, "error");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />

      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/did-management" element={<DIDManagement />} />
          <Route path="/activity" element={<RecentActivity />} />
          <Route path="/user-type" element={<UserTypeSelection />} />
          <Route path="/business-registration" element={<BusinessRegistration />} />
          <Route path="/freelancer-registration" element={<FreelancerRegistration />} />
        </Routes>
      </main>

      <Footer />

      <Modal
        isOpen={modal.isOpen}
        onClose={closeModal}
        title={modal.title}
        message={modal.message}
        type={modal.type}
      />
    </div>
  );
};

// Root App component with providers
const App = () => {
  return (
    <Router>
      <ThemeProvider>
        <WalletProvider>
          <ActivityProvider>
            <AppContent />
          </ActivityProvider>
        </WalletProvider>
      </ThemeProvider>
    </Router>
  );
};

export default App;