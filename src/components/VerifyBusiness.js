import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, Building2, Check } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

function VerifyBusiness({ updateUserData, userData }) {
  const navigate = useNavigate();
  const { t } = useLanguage();
  const [ssmNumber, setSsmNumber] = useState('');
  const [consent, setConsent] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  const [businessFound, setBusinessFound] = useState(false);

  const mockBusinessData = {
    name: 'Sinar Maju Sdn. Bhd.',
    registrationNumber: '202301001234',
    registeredDate: '15 January 2023',
    address: '123, Jalan Industri, 47100 Puchong, Selangor',
    directors: ['Tan Hui Xin', 'Low Yan Cheng'],
    status: 'Active'
  };

  const handleSearch = () => {
    if (ssmNumber && consent) {
      setIsSearching(true);
      
      setTimeout(() => {
        updateUserData({
          ssmNumber,
          businessData: mockBusinessData,
          name: mockBusinessData.directors[0]
        });
        setBusinessFound(true);
        setIsSearching(false);
      }, 2000);
    }
  };

  const handleConfirm = () => {
    navigate('/business-accounts');
  };

  if (isSearching) {
    return (
      <div className="mobile-container">
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <p>{t('verifyBusiness.connecting')}</p>
        </div>
      </div>
    );
  }

  if (businessFound) {
    return (
      <div className="mobile-container">
        <div className="header">
          <button className="back-button" onClick={() => setBusinessFound(false)}>
            <ChevronLeft />
          </button>
          <h1 className="header-title">{t('verifyBusiness.businessDetails')}</h1>
          <div style={{ width: '32px' }}></div>
        </div>

        <div className="content">
          <div style={{
            backgroundColor: '#dcfce7',
            padding: '16px',
            borderRadius: '8px',
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            marginBottom: '24px'
          }}>
            <Check size={24} color="#10b981" />
            <span style={{ color: '#10b981', fontWeight: '600' }}>
              {t('verifyBusiness.verifiedBusiness')}
            </span>
          </div>

          <div className="card">
            <div style={{ marginBottom: '20px' }}>
              <p style={{ fontSize: '14px', color: '#666', marginBottom: '4px' }}>
                {t('verifyBusiness.companyName')}
              </p>
              <p style={{ fontSize: '18px', fontWeight: '600' }}>
                {mockBusinessData.name}
              </p>
            </div>

            <div style={{ marginBottom: '20px' }}>
              <p style={{ fontSize: '14px', color: '#666', marginBottom: '4px' }}>
                {t('verifyBusiness.registrationNumber')}
              </p>
              <p style={{ fontSize: '16px', fontWeight: '500' }}>
                {mockBusinessData.registrationNumber}
              </p>
            </div>

            <div style={{ marginBottom: '20px' }}>
              <p style={{ fontSize: '14px', color: '#666', marginBottom: '4px' }}>
                {t('verifyBusiness.registeredDate')}
              </p>
              <p style={{ fontSize: '16px', fontWeight: '500' }}>
                {mockBusinessData.registeredDate}
              </p>
            </div>

            <div style={{ marginBottom: '20px' }}>
              <p style={{ fontSize: '14px', color: '#666', marginBottom: '4px' }}>
                {t('verifyBusiness.registeredAddress')}
              </p>
              <p style={{ fontSize: '16px', fontWeight: '500' }}>
                {mockBusinessData.address}
              </p>
            </div>

            <div style={{ marginBottom: '20px' }}>
              <p style={{ fontSize: '14px', color: '#666', marginBottom: '4px' }}>
                {t('verifyBusiness.directors')}
              </p>
              {mockBusinessData.directors.map((director, index) => (
                <p key={index} style={{ fontSize: '16px', fontWeight: '500' }}>
                  {director}
                </p>
              ))}
            </div>

            <div>
              <p style={{ fontSize: '14px', color: '#666', marginBottom: '4px' }}>
                {t('verifyBusiness.status')}
              </p>
              <p style={{ 
                fontSize: '16px', 
                fontWeight: '500',
                color: '#10b981'
              }}>
                {mockBusinessData.status}
              </p>
            </div>
          </div>

          <button
            className="btn-primary"
            onClick={handleConfirm}
            style={{ marginTop: '24px' }}
          >
            {t('verifyBusiness.confirmContinue')}
          </button>
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
        <h1 className="header-title">{t('verifyBusiness.title')}</h1>
        <div style={{ width: '32px' }}></div>
      </div>

      <div className="content">
        <div style={{ marginBottom: '24px' }}>
          <p style={{ fontSize: '14px', color: '#666', marginBottom: '4px' }}>
            {t('common.step')} 1 {t('common.of')} 3
          </p>
          <div className="progress-bar">
            <div className="progress-fill" style={{ width: '33.33%' }}></div>
          </div>
        </div>

        <div style={{
          display: 'flex',
          justifyContent: 'center',
          marginBottom: '32px'
        }}>
          <div style={{
            width: '80px',
            height: '80px',
            backgroundColor: '#eff6ff',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <Building2 size={40} color="#2563eb" />
          </div>
        </div>

        <div className="form-group">
          <label className="form-label">{t('verifyBusiness.ssmLabel')}</label>
          <input
            type="text"
            className="form-input"
            placeholder={t('verifyBusiness.ssmPlaceholder')}
            value={ssmNumber}
            onChange={(e) => setSsmNumber(e.target.value)}
          />
        </div>

        <label style={{
          display: 'flex',
          alignItems: 'flex-start',
          gap: '12px',
          marginBottom: '32px',
          cursor: 'pointer'
        }}>
          <input
            type="checkbox"
            checked={consent}
            onChange={(e) => setConsent(e.target.checked)}
            style={{
              width: '20px',
              height: '20px',
              marginTop: '2px',
              cursor: 'pointer'
            }}
          />
          <span style={{
            fontSize: '14px',
            color: '#666',
            lineHeight: '1.5'
          }}>
            {t('verifyBusiness.consentText')}
          </span>
        </label>

        <button
          className="btn-primary"
          onClick={handleSearch}
          disabled={!ssmNumber || !consent}
        >
          {t('verifyBusiness.findBusiness')}
        </button>
      </div>
    </div>
  );
}

export default VerifyBusiness;