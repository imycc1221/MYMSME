// components/LanguageSelection.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import mymsmeLogo from 'C:\\Users\\yanch\\mymsme-pass\\src\\assets\\images\\mymsme logo.jpg';

function LanguageSelection({ updateUserData }) {
  const navigate = useNavigate();
  const { changeLanguage, t } = useLanguage();
  const [selectedLanguage, setSelectedLanguage] = useState('');

  const languages = [
    { code: 'MY', name: 'Bahasa Melayu' },
    { code: 'ENG', name: 'English' },
    { code: 'CN', name: '中文' },
    { code: 'IN', name: 'தமிழ்' }
  ];

  const handleContinue = () => {
    if (selectedLanguage) {
      updateUserData({ language: selectedLanguage });
      changeLanguage(selectedLanguage);
      navigate('/account-setup');
    }
  };

  return (
    <div className="mobile-container">
      <div className="header">
        <button className="back-button" onClick={() => navigate(-1)}>
          <ChevronLeft />
        </button>
        <h1 className="header-title">{t('language.getStartedTitle')}</h1>
        <div style={{ width: '28px' }}></div>
      </div>

      <div className="content" style={{ paddingTop: '40px' }}>
        <div style={{
          textAlign: 'center',
          marginBottom: '24px'
        }}>
          <div style={{
            width: '56px',
            height: '56px',
            margin: '0 auto 14px',
            borderRadius: '14px',
            overflow: 'hidden'
          }}>
            <img 
              src={mymsmeLogo} 
              alt="MyMSME Pass"
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover'
              }}
            />
          </div>
          <h2 style={{
            fontSize: '22px',
            fontWeight: '600',
            marginBottom: '6px'
          }}>
            MyMSME Pass
          </h2>
          <p style={{
            fontSize: '13px',
            color: '#666'
          }}>
            {t('welcome.subtitle')}
          </p>
        </div>

        <div className="card" style={{ padding: '18px' }}>
          <h3 style={{
            fontSize: '18px',
            fontWeight: '600',
            textAlign: 'center',
            marginBottom: '18px'
          }}>
            {t('language.selectLanguage')}
          </h3>

          <div className="language-grid">
            {languages.map((lang) => (
              <button
                key={lang.code}
                className={`language-btn ${selectedLanguage === lang.code ? 'selected' : ''}`}
                onClick={() => setSelectedLanguage(lang.code)}
                style={{
                  padding: '16px',
                  height: '80px',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
              >
                <div className="language-code" style={{
                  fontSize: '18px',
                  fontWeight: '600',
                  marginBottom: '4px'
                }}>
                  {lang.code}
                </div>
                <div className="language-name" style={{
                  fontSize: '13px',
                  color: '#666'
                }}>
                  {lang.name}
                </div>
              </button>
            ))}
          </div>
        </div>

        <button 
          className="btn-primary"
          onClick={handleContinue}
          disabled={!selectedLanguage}
          style={{ marginTop: '24px' }}
        >
          {t('common.continue')}
        </button>
      </div>
    </div>
  );
}

export default LanguageSelection;