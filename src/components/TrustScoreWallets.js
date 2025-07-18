import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, Check } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

// Import wallet logos
import tngLogo from 'C:\\Users\\yanch\\mymsme-pass\\src\\assets\\images\\TNG-eWallet.png';
import grabLogo from 'C:\\Users\\yanch\\mymsme-pass\\src\\assets\\images\\grab pay.png';
import boostLogo from 'C:\\Users\\yanch\\mymsme-pass\\src\\assets\\images\\boost.png';
import maeLogo from 'C:\\Users\\yanch\\mymsme-pass\\src\\assets\\images\\mae.png';

function TrustScoreWallets({ updateUserData, userData }) {
  const navigate = useNavigate();
  const { t } = useLanguage();
  const [connectedAccounts, setConnectedAccounts] = useState([]);
  const [connecting, setConnecting] = useState('');

  const wallets = [
    { 
      id: 'tng', 
      name: "Touch 'n Go", 
      color: '#005EB8',
      logo: tngLogo
    },
    { 
      id: 'grab', 
      name: 'GrabPay', 
      color: '#00B14F',
      logo: grabLogo
    },
    { 
      id: 'boost', 
      name: 'Boost', 
      color: '#ED1C24',
      logo: boostLogo
    },
    { 
      id: 'mae', 
      name: 'MAE by Maybank2u', 
      color: '#FFD700',
      logo: maeLogo
    }
  ];

  const handleConnect = (walletId) => {
    setConnecting(walletId);
    // Simulate connection process
    setTimeout(() => {
      setConnectedAccounts([...connectedAccounts, walletId]);
      setConnecting('');
    }, 2000);
  };

  const handleContinue = () => {
    updateUserData({ connectedAccounts });
    navigate('/trust-score-bills');
  };

  return (
    <div className="mobile-container">
      <div className="header">
        <button className="back-button" onClick={() => navigate(-1)}>
          <ChevronLeft />
        </button>
        <h1 className="header-title">{t('trustScore.title')}</h1>
        <div style={{ width: '32px' }}></div>
      </div>

      <div className="content">
        <div style={{ marginBottom: '24px' }}>
          <p style={{ fontSize: '14px', color: '#666', marginBottom: '4px' }}>
            {t('common.step')} 3 {t('common.of')} 3 - Part 1
          </p>
          <div className="progress-bar">
            <div className="progress-fill" style={{ width: '83.33%' }}></div>
          </div>
        </div>

        <p style={{
          fontSize: '14px',
          color: '#666',
          marginBottom: '32px',
          textAlign: 'center'
        }}>
          {t('trustScore.moreConnections')}
        </p>

        <div style={{ marginBottom: '32px' }}>
          <h3 style={{
            fontSize: '18px',
            fontWeight: '600',
            marginBottom: '12px'
          }}>
            {t('trustScore.walletSection.heading')}
          </h3>
          <p style={{
            fontSize: '14px',
            color: '#666',
            marginBottom: '20px'
          }}>
            {t('trustScore.walletSection.description')}
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {wallets.map((wallet) => (
              <div
                key={wallet.id}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '16px',
                  backgroundColor: '#f8fafc',
                  borderRadius: '8px',
                  border: '1px solid #e5e7eb'
                }}
              >
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px'
                }}>
                  <div style={{
                    width: '40px',
                    height: '40px',
                    borderRadius: '8px',
                    overflow: 'hidden',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor: 'white'
                  }}>
                    <img 
                      src={wallet.logo} 
                      alt={wallet.name}
                      style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'contain'
                      }}
                    />
                  </div>
                  <span style={{ fontWeight: '500' }}>{wallet.name}</span>
                </div>
                
                {connectedAccounts.includes(wallet.id) ? (
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '4px',
                    color: '#10b981'
                  }}>
                    <Check size={20} />
                    <span style={{ fontSize: '14px', fontWeight: '500' }}>
                      {t('trustScore.walletSection.connected')}
                    </span>
                  </div>
                ) : (
                  <button
                    onClick={() => handleConnect(wallet.id)}
                    disabled={connecting === wallet.id}
                    style={{
                      padding: '6px 16px',
                      backgroundColor: connecting === wallet.id ? '#e5e7eb' : '#2563eb',
                      color: 'white',
                      border: 'none',
                      borderRadius: '6px',
                      fontSize: '14px',
                      fontWeight: '500',
                      cursor: connecting === wallet.id ? 'default' : 'pointer'
                    }}
                  >
                    {connecting === wallet.id ? t('trustScore.walletSection.connecting') : t('trustScore.walletSection.connect')}
                  </button>
                )}
              </div>
            ))}

            <button
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '16px',
                backgroundColor: '#f8fafc',
                borderRadius: '8px',
                border: '1px solid #e5e7eb',
                cursor: 'pointer'
              }}
              onClick={() => alert(t('myKiosk.bankAccountComing'))}
            >
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px'
              }}>
                <div style={{
                  width: '40px',
                  height: '40px',
                  backgroundColor: '#1a1a1a',
                  borderRadius: '8px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'white'
                }}>
                  🏦
                </div>
                <span style={{ fontWeight: '500' }}>
                  {t('trustScore.walletSection.linkBank')}
                </span>
              </div>
              <span style={{
                fontSize: '14px',
                fontWeight: '500',
                color: '#2563eb'
              }}>
                {t('trustScore.walletSection.connect')}
              </span>
            </button>
          </div>
        </div>

        <button
          className="btn-primary"
          onClick={handleContinue}
          disabled={connectedAccounts.length === 0}
        >
          {t('trustScore.walletSection.continueButton')}
        </button>
      </div>
    </div>
  );
}

export default TrustScoreWallets;