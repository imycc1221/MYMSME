// App.js
import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import './App.css';
import { LanguageProvider } from './contexts/LanguageContext';

// Import all components
import WelcomePage from './components/WelcomePage';
import LanguageSelection from './components/LanguageSelection';
import AccountSetup from './components/AccountSetup';
import VerifyIdentity from './components/VerifyIdentity';
import DigitalShop from './components/DigitalShop';
import TrustScoreWallets from './components/TrustScoreWallets';
import TrustScoreBills from './components/TrustScoreBills';
import VerifyBusiness from './components/VerifyBusiness';
import BusinessAccounts from './components/BusinessAccounts';
import PassHub from './components/PassHub';
import Marketplace from './components/Marketplace';
import LoanApplication from './components/LoanApplication';
import InsurancePlans from './components/InsurancePlans';
import InsuranceApplication from './components/InsuranceApplication';
import PolicyConfirmation from './components/PolicyConfirmation';
import MyKiosk from './components/MyKiosk';
import Settings from './components/Settings';

function App() {
  const [userData, setUserData] = useState({
    language: '',
    businessType: '',
    name: '',
    myKadPhoto: null,
    selfiePhoto: null,
    shopName: '',
    shopPhoto: null,
    location: '',
    ssmNumber: '',
    businessData: {},
    connectedAccounts: [],
    bills: {
      electricity: null,
      water: null,
      phone: null
    },
    trustScore: 0
  });

  const updateUserData = (data) => {
    setUserData(prev => ({ ...prev, ...data }));
  };

  return (
    <LanguageProvider>
      <Router>
        <div className="App">
          <Routes>
            <Route path="/" element={<WelcomePage />} />
            <Route path="/language" element={<LanguageSelection updateUserData={updateUserData} />} />
            <Route path="/account-setup" element={<AccountSetup updateUserData={updateUserData} userData={userData} />} />
            <Route path="/verify-identity" element={<VerifyIdentity updateUserData={updateUserData} userData={userData} />} />
            <Route path="/digital-shop" element={<DigitalShop updateUserData={updateUserData} userData={userData} />} />
            <Route path="/trust-score-wallets" element={<TrustScoreWallets updateUserData={updateUserData} userData={userData} />} />
            <Route path="/trust-score-bills" element={<TrustScoreBills updateUserData={updateUserData} userData={userData} />} />
            <Route path="/verify-business" element={<VerifyBusiness updateUserData={updateUserData} userData={userData} />} />
            <Route path="/business-accounts" element={<BusinessAccounts updateUserData={updateUserData} userData={userData} />} />
            <Route path="/pass-hub" element={<PassHub userData={userData} />} />
            <Route path="/marketplace" element={<Marketplace userData={userData} />} />
            <Route path="/loan-application" element={<LoanApplication userData={userData} />} />
            <Route path="/insurance-plans" element={<InsurancePlans userData={userData} />} />
            <Route path="/insurance-application" element={<InsuranceApplication userData={userData} />} />
            <Route path="/policy-confirmation" element={<PolicyConfirmation userData={userData} />} />
            <Route path="/my-kiosk" element={<MyKiosk userData={userData} />} />
            <Route path="/settings" element={<Settings userData={userData} updateUserData={updateUserData} />} />
          </Routes>
        </div>
      </Router>
    </LanguageProvider>
  );
}

export default App;