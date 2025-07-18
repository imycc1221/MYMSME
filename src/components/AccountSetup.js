// components/AccountSetup.js
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, User, Building2 } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

function AccountSetup({ updateUserData, userData }) {
  const navigate = useNavigate();
  const { t } = useLanguage();

  const handleSelection = (type) => {
    updateUserData({ businessType: type });
    if (type === 'individual') {
      navigate('/verify-identity');
    } else {
      navigate('/verify-business');
    }
  };

  return (
    <div className="mobile-container">
      <div className="header">
        <button className="back-button" onClick={() => navigate(-1)}>
          <ChevronLeft />
        </button>
        <h1 className="header-title">{t('accountSetup.title')}</h1>
        <div style={{ width: '32px' }}></div>
      </div>

      <div className="content">
        <p style={{
          fontSize: '16px',
          color: '#666',
          textAlign: 'center',
          marginBottom: '32px'
        }}>
          {t('accountSetup.subtitle')}
        </p>

        <h2 style={{
          fontSize: '20px',
          fontWeight: '600',
          textAlign: 'center',
          marginBottom: '32px'
        }}>
          {t('accountSetup.question')}
        </h2>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <button
            className="card"
            onClick={() => handleSelection('individual')}
            style={{
              cursor: 'pointer',
              border: '2px solid #e5e7eb',
              transition: 'all 0.3s ease',
              textAlign: 'left'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = '#2563eb';
              e.currentTarget.style.transform = 'translateY(-2px)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = '#e5e7eb';
              e.currentTarget.style.transform = 'translateY(0)';
            }}
          >
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '16px' }}>
              <div style={{
                width: '48px',
                height: '48px',
                backgroundColor: '#fef3c7',
                borderRadius: '12px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0
              }}>
                <User size={24} color="#f59e0b" />
              </div>
              <div>
                <h3 style={{
                  fontSize: '18px',
                  fontWeight: '600',
                  marginBottom: '8px'
                }}>
                  {t('accountSetup.individual.title')}
                </h3>
                <p style={{
                  fontSize: '14px',
                  color: '#666',
                  lineHeight: '1.5'
                }}>
                  {t('accountSetup.individual.description')}
                </p>
              </div>
            </div>
          </button>

          <button
            className="card"
            onClick={() => handleSelection('business')}
            style={{
              cursor: 'pointer',
              border: '2px solid #e5e7eb',
              transition: 'all 0.3s ease',
              textAlign: 'left'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = '#2563eb';
              e.currentTarget.style.transform = 'translateY(-2px)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = '#e5e7eb';
              e.currentTarget.style.transform = 'translateY(0)';
            }}
          >
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '16px' }}>
              <div style={{
                width: '48px',
                height: '48px',
                backgroundColor: '#dbeafe',
                borderRadius: '12px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0
              }}>
                <Building2 size={24} color="#2563eb" />
              </div>
              <div>
                <h3 style={{
                  fontSize: '18px',
                  fontWeight: '600',
                  marginBottom: '8px'
                }}>
                  {t('accountSetup.business.title')}
                </h3>
                <p style={{
                  fontSize: '14px',
                  color: '#666',
                  lineHeight: '1.5'
                }}>
                  {t('accountSetup.business.description')}
                </p>
              </div>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
}

export default AccountSetup;