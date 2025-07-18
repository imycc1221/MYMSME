// components/WelcomePage.js
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';
import mymsmeLogo from 'C:\\Users\\yanch\\mymsme-pass\\src\\assets\\images\\mymsme logo.jpg';

function WelcomePage() {
  const navigate = useNavigate();
  const { t } = useLanguage();

  return (
    <div className="mobile-container">
      <div style={{ 
        display: 'flex', 
        flexDirection: 'column', 
        justifyContent: 'center', 
        alignItems: 'center',
        height: '100vh',
        padding: '40px 20px',
        background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)',
        position: 'relative',
        overflow: 'hidden'
      }}>
        <div className="fade-in" style={{ textAlign: 'center' }}>
          <div style={{
            width: '80px',
            height: '80px',
            margin: '0 auto 24px',
            borderRadius: '20px',
            overflow: 'hidden',
            boxShadow: '0 8px 24px rgba(37, 99, 235, 0.3)'
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
          
          <h1 style={{
            fontSize: '28px',
            fontWeight: '700',
            marginBottom: '12px',
            color: '#1a1a1a'
          }}>
            {t('welcome.title')}
          </h1>
          
          <p style={{
            fontSize: '16px',
            color: '#666',
            marginBottom: '48px'
          }}>
            {t('welcome.subtitle')}
          </p>
          
          <button 
            className="btn-primary"
            onClick={() => navigate('/language')}
            style={{ marginBottom: '16px', maxWidth: '200px' }}
          >
            {t('common.getStarted')}
          </button>
        </div>
      </div>
    </div>
  );
}

export default WelcomePage;