import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, Building, FileText, Check } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

function BusinessAccounts({ updateUserData, userData }) {
  const navigate = useNavigate();
  const { t } = useLanguage();
  const [merchantLinked, setMerchantLinked] = useState(false);
  const [ccrisLinked, setCcrisLinked] = useState(false);
  const [linking, setLinking] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);

  const handleLinkMerchant = () => {
    setLinking('merchant');
    setTimeout(() => {
      setMerchantLinked(true);
      setLinking('');
    }, 2000);
  };

  const handleLinkCCRIS = () => {
    setLinking('ccris');
    setTimeout(() => {
      setCcrisLinked(true);
      setLinking('');
    }, 2500);
  };

  const handleGenerateTrustScore = () => {
    setIsGenerating(true);
    // Formal businesses get higher trust scores
    const trustScore = 750;
    updateUserData({ 
      trustScore,
      merchantLinked,
      ccrisLinked
    });
    
    setTimeout(() => {
      navigate('/pass-hub');
    }, 3000);
  };

  if (isGenerating) {
    return (
      <div className="mobile-container">
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <h2 style={{ fontSize: '20px', fontWeight: '600', marginTop: '24px' }}>
            {t('businessAccounts.calculating')}
          </h2>
          <p style={{ color: '#666', marginTop: '8px' }}>
            {t('businessAccounts.building')}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="mobile-container">
      <div className="header">
        <button className="back-button" onClick={() => navigate(-1)}>
          <ChevronLeft />
        </button>
        <h1 className="header-title">{t('businessAccounts.title')}</h1>
        <div style={{ width: '32px' }}></div>
      </div>

      <div className="content">
        <div style={{ marginBottom: '24px' }}>
          <p style={{ fontSize: '14px', color: '#666', marginBottom: '4px' }}>
            {t('common.step')} 2 {t('common.of')} 3
          </p>
          <div className="progress-bar">
            <div className="progress-fill" style={{ width: '66.66%' }}></div>
          </div>
        </div>

        <div style={{ marginBottom: '32px' }}>
          <h3 style={{
            fontSize: '18px',
            fontWeight: '600',
            marginBottom: '12px'
          }}>
            {t('businessAccounts.merchantAccount.heading')}
          </h3>
          <p style={{
            fontSize: '14px',
            color: '#666',
            marginBottom: '20px'
          }}>
            {t('businessAccounts.merchantAccount.description')}
          </p>

          <button
            onClick={handleLinkMerchant}
            disabled={merchantLinked || linking === 'merchant'}
            style={{
              width: '100%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '20px',
              backgroundColor: merchantLinked ? '#dcfce7' : '#f8fafc',
              borderRadius: '8px',
              border: `2px solid ${merchantLinked ? '#10b981' : '#e5e7eb'}`,
              cursor: merchantLinked ? 'default' : 'pointer',
              transition: 'all 0.3s ease',
              marginBottom: '32px'
            }}
          >
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '16px'
            }}>
              <div style={{
                width: '48px',
                height: '48px',
                backgroundColor: merchantLinked ? '#10b981' : '#2563eb',
                borderRadius: '8px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'white'
              }}>
                {merchantLinked ? <Check size={24} /> : <Building size={24} />}
              </div>
              <span style={{ 
                fontWeight: '500',
                fontSize: '16px',
                color: merchantLinked ? '#10b981' : '#1a1a1a'
              }}>
                {merchantLinked ? t('businessAccounts.merchantAccount.connected') : t('businessAccounts.merchantAccount.linkButton')}
              </span>
            </div>
            {!merchantLinked && (
              <span style={{ 
                color: '#2563eb',
                fontWeight: '500'
              }}>
                {linking === 'merchant' ? t('businessAccounts.merchantAccount.connecting') : t('businessAccounts.merchantAccount.connect')}
              </span>
            )}
          </button>
        </div>

        <div style={{ marginBottom: '32px' }}>
          <h3 style={{
            fontSize: '18px',
            fontWeight: '600',
            marginBottom: '12px'
          }}>
            {t('businessAccounts.ccris.heading')}
          </h3>
          <p style={{
            fontSize: '14px',
            color: '#666',
            marginBottom: '20px'
          }}>
            {t('businessAccounts.ccris.description')}
          </p>

          <button
            onClick={handleLinkCCRIS}
            disabled={ccrisLinked || linking === 'ccris'}
            style={{
              width: '100%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '20px',
              backgroundColor: ccrisLinked ? '#dcfce7' : '#f8fafc',
              borderRadius: '8px',
              border: `2px solid ${ccrisLinked ? '#10b981' : '#e5e7eb'}`,
              cursor: ccrisLinked ? 'default' : 'pointer',
              transition: 'all 0.3s ease'
            }}
          >
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '16px'
            }}>
              <div style={{
                width: '48px',
                height: '48px',
                backgroundColor: ccrisLinked ? '#10b981' : '#f59e0b',
                borderRadius: '8px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'white'
              }}>
                {ccrisLinked ? <Check size={24} /> : <FileText size={24} />}
              </div>
              <span style={{ 
                fontWeight: '500',
                fontSize: '16px',
                color: ccrisLinked ? '#10b981' : '#1a1a1a'
              }}>
                {ccrisLinked ? t('businessAccounts.ccris.connected') : t('businessAccounts.ccris.connectButton')}
              </span>
            </div>
            {!ccrisLinked && (
              <span style={{ 
                color: '#2563eb',
                fontWeight: '500'
              }}>
                {linking === 'ccris' ? t('businessAccounts.ccris.connecting') : t('businessAccounts.ccris.connect')}
              </span>
            )}
          </button>
        </div>

        <button
          className="btn-primary"
          onClick={handleGenerateTrustScore}
          disabled={!merchantLinked || !ccrisLinked}
        >
          {t('businessAccounts.generateButton')}
        </button>
      </div>
    </div>
  );
}

export default BusinessAccounts;