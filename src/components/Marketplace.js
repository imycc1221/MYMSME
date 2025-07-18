import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Home, ShoppingBag, Store, Settings, ChevronRight, Lock } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

function Marketplace({ userData }) {
  const navigate = useNavigate();
  const { t } = useLanguage(); // Add this line
  
  // Use translations for services array
  const services = [
    {
      id: 'bank-account',
      title: t('marketplace.services.bankAccount.title'),
      description: t('marketplace.services.bankAccount.description'),
      icon: '🏦',
      minScore: 300,
      provider: 'Partner Banks',
      color: '#2563eb'
    },
    {
      id: 'micro-loan',
      title: t('marketplace.services.microLoan.title'),
      description: t('marketplace.services.microLoan.description'),
      icon: '💰',
      minScore: 400,
      provider: 'PayHack FinTech',
      color: '#10b981'
    },
    {
      id: 'insurance',
      title: t('marketplace.services.insurance.title'),
      description: t('marketplace.services.insurance.description'),
      icon: '🛡️',
      minScore: 450,
      provider: 'SecureShield Insurance',
      color: '#8b5cf6'
    },
    {
      id: 'government-grants',
      title: t('marketplace.services.grants.title'),
      description: t('marketplace.services.grants.description'),
      icon: '🏛️',
      minScore: 500,
      provider: 'SME Corp Malaysia',
      color: '#06b6d4'
    }
  ];

  const handleServiceClick = (service) => {
    if (userData.trustScore >= service.minScore) {
      if (service.id === 'micro-loan') {
        navigate('/loan-application');
      } else if (service.id === 'insurance') {
        navigate('/insurance-plans');
      } else {
        alert(`${service.title} application coming soon!`);
      }
    }
  };

  return (
    <div className="mobile-container">
      <div className="header">
        <h1 className="header-title">{t('marketplace.title')}</h1>
        <div style={{ width: '32px' }}></div>
      </div>

      <div className="content">
        <div style={{
          backgroundColor: '#f8fafc',
          padding: '16px',
          borderRadius: '12px',
          marginBottom: '20px',
          textAlign: 'center'
        }}>
          <p style={{ fontSize: '14px', color: '#666', marginBottom: '4px' }}>
            {t('marketplace.yourTrustScore')}
          </p>
          <p style={{ 
            fontSize: '24px', 
            fontWeight: '700',
            color: userData.trustScore >= 700 ? '#10b981' : userData.trustScore >= 500 ? '#f59e0b' : '#ef4444'
          }}>
            {userData.trustScore}/1000
          </p>
        </div>

        <div style={{ marginBottom: '20px' }}>
          <h2 style={{
            fontSize: '18px',
            fontWeight: '600',
            marginBottom: '12px'
          }}>
            {t('marketplace.availableServices')}
          </h2>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {services.map((service) => {
              const isLocked = userData.trustScore < service.minScore;
              
              return (
                <button
                  key={service.id}
                  onClick={() => handleServiceClick(service)}
                  disabled={isLocked}
                  className={`service-card ${isLocked ? 'disabled' : ''}`}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '18px',
                    backgroundColor: 'white',
                    border: '1px solid #e5e7eb',
                    borderRadius: '12px',
                    cursor: isLocked ? 'not-allowed' : 'pointer',
                    opacity: isLocked ? 0.6 : 1,
                    transition: 'all 0.3s ease',
                    textAlign: 'left',
                    width: '100%'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                    <div style={{
                      width: '48px',
                      height: '48px',
                      backgroundColor: isLocked ? '#e5e7eb' : `${service.color}20`,
                      borderRadius: '12px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '24px'
                    }}>
                      {service.icon}
                    </div>
                    
                    <div>
                      <h3 style={{
                        fontSize: '16px',
                        fontWeight: '600',
                        marginBottom: '4px',
                        color: isLocked ? '#94a3b8' : '#1a1a1a'
                      }}>
                        {service.title}
                      </h3>
                      <p style={{
                        fontSize: '13px',
                        color: '#666',
                        marginBottom: '4px'
                      }}>
                        {service.description}
                      </p>
                      <p style={{
                        fontSize: '12px',
                        color: service.color,
                        fontWeight: '500'
                      }}>
                        {service.provider}
                      </p>
                      {isLocked && (
                        <p style={{
                          fontSize: '11px',
                          color: '#ef4444',
                          marginTop: '4px'
                        }}>
                          {t('marketplace.requiredScore')}: {service.minScore}
                        </p>
                      )}
                    </div>
                  </div>
                  
                  {isLocked ? (
                    <Lock size={20} color="#94a3b8" />
                  ) : (
                    <ChevronRight size={20} color="#64748b" />
                  )}
                </button>
              );
            })}
          </div>
        </div>

        <div style={{
          backgroundColor: '#eff6ff',
          padding: '16px',
          borderRadius: '12px',
          marginTop: '16px'
        }}>
          <p style={{
            fontSize: '14px',
            color: '#2563eb',
            textAlign: 'center'
          }}>
            {t('marketplace.tip')}
          </p>
        </div>
      </div>

      {/* Bottom Navigation */}
      <div className="bottom-nav">
        <div className="nav-item" onClick={() => navigate('/pass-hub')}>
          <Home size={24} />
          <span className="nav-label">{t('bottomNav.pass')}</span>
        </div>
        <div className="nav-item active">
          <ShoppingBag size={24} />
          <span className="nav-label">{t('bottomNav.marketplace')}</span>
        </div>
        <div className="nav-item" onClick={() => navigate('/my-kiosk')}>
          <Store size={24} />
          <span className="nav-label">{t('bottomNav.myKiosk')}</span>
        </div>
        <div className="nav-item" onClick={() => navigate('/settings')}>
          <Settings size={24} />
          <span className="nav-label">{t('bottomNav.settings')}</span>
        </div>
      </div>
    </div>
  );
}

export default Marketplace;