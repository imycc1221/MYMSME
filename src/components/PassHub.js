import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Home, ShoppingBag, Store, Settings, Bell, Share2, Download, Crown, Check, X } from 'lucide-react';
import { QRCodeCanvas } from 'qrcode.react';
import { useLanguage } from '../contexts/LanguageContext';

function PassHub({ userData }) {
  const navigate = useNavigate();
  const { t } = useLanguage();
  const [showUpgradeModal, setShowUpgradeModal] = useState(false);
  
  const isIndividual = userData.businessType === 'individual';
  const businessName = isIndividual ? userData.shopName : userData.businessData?.name;
  const displayName = userData.name || 'User';
  
  const getScoreColor = (score) => {
    if (score >= 900) return '#10b981';
    if (score >= 750) return '#f59e0b';
    if (score >= 600) return '#eab308';
    return '#ef4444';
  };

  const getScoreLabel = (score) => {
    if (score >= 900) return t('passHub.excellentScore');
    if (score >= 750) return t('passHub.goodScore');
    if (score >= 600) return t('passHub.fairScore');
    return t('passHub.poorScore');
  };

  const handleShare = () => {
    alert(t('passHub.shareFunction'));
  };

  const handleExportPDF = () => {
    alert(t('passHub.pdfExport'));
  };

  const handleUpgrade = () => {
    alert(t('passHub.redirectPayment'));
    setShowUpgradeModal(false);
  };

  const freePlanFeatures = [
    { text: t('passHub.sixMonthLicense'), included: true },
    { text: t('passHub.basicPass'), included: true },
    { text: t('passHub.creditReports'), included: false },
    { text: t('passHub.dataExport'), included: false },
    { text: t('passHub.autoBackup'), included: false },
    { text: t('passHub.vipSupport'), included: false },
    { text: t('passHub.insuranceDiscounts'), included: false }
  ];

  const proPlanFeatures = [
    { text: t('passHub.unlimitedLicense'), included: true },
    { text: t('passHub.fullPass'), included: true },
    { text: t('passHub.creditReports36'), included: true },
    { text: t('passHub.dataExport'), included: true },
    { text: t('passHub.autoBackup'), included: true },
    { text: t('passHub.vipSupport48'), included: true },
    { text: t('passHub.tenPercentDiscounts'), included: true }
  ];

  return (
    <div className="mobile-container">
      <div className="header">
        <h1 className="header-title">{t('passHub.title')}</h1>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <button 
            onClick={() => setShowUpgradeModal(true)}
            className="upgrade-badge"
          >
            <Crown size={16} />
            {t('passHub.upgradeToPro')}
          </button>
          <button style={{ background: 'none', border: 'none', cursor: 'pointer' }}>
            <Bell size={24} color="#666" />
          </button>
        </div>
      </div>

      <div className="content">
        {/* Digital Pass Card */}
        <div className="pass-card">
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-start',
            marginBottom: '20px'
          }}>
            <div style={{ flex: 1 }}>
              <h2 style={{
                fontSize: '24px',
                fontWeight: '700',
                marginBottom: '4px'
              }}>
                {businessName || 'My Business'}
              </h2>
              <p style={{
                fontSize: '16px',
                opacity: 0.9
              }}>
                {displayName}
              </p>
            </div>
            <div className="qr-container">
              <QRCodeCanvas
                value={`mymsme://verify/${userData.businessType}/${Date.now()}`}
                size={80}
                level="M"
              />
            </div>
          </div>

          <div style={{
            backgroundColor: 'rgba(255, 255, 255, 0.2)',
            borderRadius: '8px',
            padding: '12px',
            marginBottom: '16px'
          }}>
            <p style={{ fontSize: '14px', marginBottom: '8px', fontWeight: '500' }}>
              {t('passHub.verificationStatus')}
            </p>
            {isIndividual ? (
              <>
                <p style={{ fontSize: '13px', marginBottom: '4px' }}>{t('passHub.identityVerified')}</p>
                <p style={{ fontSize: '13px', marginBottom: '4px' }}>{t('passHub.utilityVerified')}</p>
                <p style={{ fontSize: '13px' }}>{t('passHub.businessPersona')}: {userData.shopName ? t('passHub.foodStall') : t('passHub.individualTrader')}</p>
              </>
            ) : (
              <>
                <p style={{ fontSize: '13px', marginBottom: '4px' }}>{t('passHub.identityVerified')}</p>
                <p style={{ fontSize: '13px', marginBottom: '4px' }}>{t('passHub.ssmVerified')} ({t('passHub.registrationNo')} {userData.businessData?.registrationNumber})</p>
                <p style={{ fontSize: '13px' }}>{t('passHub.ccrisConnected')}</p>
              </>
            )}
          </div>

          <div style={{
            display: 'flex',
            gap: '12px'
          }}>
            <button
              onClick={handleShare}
              style={{
                flex: 1,
                padding: '10px',
                backgroundColor: 'rgba(255, 255, 255, 0.2)',
                color: 'white',
                border: '1px solid rgba(255, 255, 255, 0.3)',
                borderRadius: '8px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
                cursor: 'pointer',
                fontSize: '14px',
                fontWeight: '500'
              }}
            >
              <Share2 size={18} />
              {t('passHub.sharePass')}
            </button>
            <button
              onClick={handleExportPDF}
              style={{
                flex: 1,
                padding: '10px',
                backgroundColor: 'rgba(255, 255, 255, 0.2)',
                color: 'white',
                border: '1px solid rgba(255, 255, 255, 0.3)',
                borderRadius: '8px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
                cursor: 'pointer',
                fontSize: '14px',
                fontWeight: '500'
              }}
            >
              <Download size={18} />
              {t('passHub.exportPDF')}
            </button>
          </div>
        </div>

        {/* Trust Score */}
        <div className="trust-score-container" style={{ marginTop: '16px', marginBottom: '20px' }}>
          <h3 style={{
            fontSize: '16px',
            fontWeight: '600',
            marginBottom: '12px',
            textAlign: 'center'
          }}>
            {t('passHub.trustScore')}
          </h3>
          <div className="score-meter">
            <div 
              className="score-fill" 
              style={{ 
                width: `${(userData.trustScore / 1000) * 100}%`,
                backgroundColor: getScoreColor(userData.trustScore)
              }}
            ></div>
          </div>
          <div className="score-text" style={{ color: getScoreColor(userData.trustScore) }}>
            {userData.trustScore}/1000
          </div>
          <p style={{
            textAlign: 'center',
            fontSize: '13px',
            color: '#666',
            marginTop: '6px'
          }}>
            {getScoreLabel(userData.trustScore)} {t('passHub.score')}
          </p>
        </div>

        {/* Quick Actions */}
        <div style={{ marginTop: '20px' }}>
          <h3 style={{
            fontSize: '18px',
            fontWeight: '600',
            marginBottom: '16px'
          }}>
            {t('passHub.quickActions')}
          </h3>
          <button
            onClick={() => navigate('/marketplace')}
            className="btn-primary"
          >
            {t('passHub.exploreServices')}
          </button>
        </div>
      </div>

      {/* Bottom Navigation */}
      <div className="bottom-nav">
        <div className="nav-item active">
          <Home size={20} />
          <span className="nav-label">{t('bottomNav.pass')}</span>
        </div>
        <div className="nav-item" onClick={() => navigate('/marketplace')}>
          <ShoppingBag size={20} />
          <span className="nav-label">{t('bottomNav.marketplace')}</span>
        </div>
        <div className="nav-item" onClick={() => navigate('/my-kiosk')}>
          <Store size={20} />
          <span className="nav-label">{t('bottomNav.myKiosk')}</span>
        </div>
        <div className="nav-item" onClick={() => navigate('/settings')}>
          <Settings size={20} />
          <span className="nav-label">{t('bottomNav.settings')}</span>
        </div>
      </div>

      {/* Upgrade Modal */}
      {showUpgradeModal && (
        <div className="modal-overlay" onClick={() => setShowUpgradeModal(false)}>
          <div 
            className="modal-content" 
            onClick={(e) => e.stopPropagation()}
            style={{
              maxWidth: '400px',
              maxHeight: '90vh',
              overflowY: 'auto'
            }}
          >
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: '24px'
            }}>
              <h2 style={{
                fontSize: '24px',
                fontWeight: '700'
              }}>
                {t('passHub.chooseYourPlan')}
              </h2>
              <button
                onClick={() => setShowUpgradeModal(false)}
                style={{
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  padding: '4px'
                }}
              >
                <X size={24} color="#666" />
              </button>
            </div>

            {/* Free Plan */}
            <div style={{
              border: '2px solid #e5e7eb',
              borderRadius: '12px',
              padding: '20px',
              marginBottom: '20px'
            }}>
              <h3 style={{
                fontSize: '20px',
                fontWeight: '600',
                marginBottom: '8px'
              }}>
                {t('passHub.freePlan')}
              </h3>
              <p style={{
                fontSize: '24px',
                fontWeight: '700',
                color: '#666',
                marginBottom: '16px'
              }}>
                RM 0 <span style={{ fontSize: '14px', fontWeight: '400' }}>{t('passHub.forever')}</span>
              </p>
              <ul style={{ listStyleType: 'none', padding: 0 }}>
                {freePlanFeatures.map((feature, index) => (
                  <li key={index} style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    marginBottom: '8px',
                    fontSize: '14px',
                    color: feature.included ? '#666' : '#cbd5e1'
                  }}>
                    {feature.included ? (
                      <Check size={16} color="#10b981" />
                    ) : (
                      <X size={16} color="#cbd5e1" />
                    )}
                    <span style={{ textDecoration: feature.included ? 'none' : 'line-through' }}>
                      {feature.text}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Pro Plan */}
            <div style={{
              border: '2px solid #f59e0b',
              borderRadius: '12px',
              padding: '20px',
              backgroundColor: '#fffbeb',
              position: 'relative'
            }}>
              <div style={{
                position: 'absolute',
                top: '-12px',
                right: '20px',
                backgroundColor: '#f59e0b',
                color: 'white',
                padding: '4px 12px',
                borderRadius: '20px',
                fontSize: '12px',
                fontWeight: '600'
              }}>
                {t('passHub.recommended')}
              </div>
              <h3 style={{
                fontSize: '20px',
                fontWeight: '600',
                marginBottom: '8px'
              }}>
                {t('passHub.proPlan')}
              </h3>
              <p style={{
                fontSize: '24px',
                fontWeight: '700',
                color: '#f59e0b',
                marginBottom: '16px'
              }}>
                RM 19.90 <span style={{ fontSize: '14px', fontWeight: '400' }}>/ {t('loan.months').toLowerCase()}</span>
              </p>
              <ul style={{ listStyleType: 'none', padding: 0, marginBottom: '20px' }}>
                {proPlanFeatures.map((feature, index) => (
                  <li key={index} style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    marginBottom: '8px',
                    fontSize: '14px',
                    color: '#666'
                  }}>
                    <Check size={16} color="#f59e0b" />
                    {feature.text}
                  </li>
                ))}
              </ul>
              <button
                onClick={handleUpgrade}
                style={{
                  width: '100%',
                  padding: '14px',
                  backgroundColor: '#f59e0b',
                  color: 'white',
                  border: 'none',
                  borderRadius: '8px',
                  fontSize: '16px',
                  fontWeight: '600',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease'
                }}
                onMouseEnter={(e) => {
                  e.target.style.backgroundColor = '#f97316';
                }}
                onMouseLeave={(e) => {
                  e.target.style.backgroundColor = '#f59e0b';
                }}
              >
                {t('passHub.upgradeToPro')}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default PassHub;