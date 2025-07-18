import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, Check } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

function LoanApplication({ userData }) {
  const navigate = useNavigate();
  const { t } = useLanguage();
  const [loanAmount, setLoanAmount] = useState(2500);
  const [showConsent, setShowConsent] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  
  // Calculate max loan based on trust score
  const getMaxLoan = () => {
    if (userData.trustScore >= 700) return 50000;
    if (userData.trustScore >= 600) return 30000;
    if (userData.trustScore >= 500) return 20000;
    if (userData.trustScore >= 400) return 10000;
    return 5000;
  };
  
  const maxLoan = getMaxLoan();
  const interestRate = 0.03; // 8% annual
  const tenure = 12; // months
  
  const monthlyRepayment = Math.round((loanAmount * (1 + interestRate)) / tenure);
  
  const handleApply = () => {
    setShowConsent(true);
  };
  
  const handleConfirm = () => {
    setShowConsent(false);
    setShowSuccess(true);
    
    setTimeout(() => {
      navigate('/marketplace');
    }, 3000);
  };

  if (showSuccess) {
    return (
      <div className="mobile-container">
        <div className="success-container">
          <div className="success-icon">
            <Check size={40} color="white" />
          </div>
          <h2 style={{ fontSize: '24px', fontWeight: '600', marginBottom: '12px' }}>
            {t('loan.congratulations')}
          </h2>
          <h3 style={{ fontSize: '18px', fontWeight: '500', marginBottom: '16px' }}>
            {t('loan.loanApproved')}
          </h3>
          <p style={{ color: '#666', marginBottom: '8px' }}>
            RM{loanAmount.toLocaleString()} {t('loan.willBeDisbursed')}
          </p>
          <p style={{ color: '#666' }}>
            {t('loan.yourLinkedAccount')}
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
        <h1 className="header-title">{t('loan.microLoanApplication')}</h1>
        <div style={{ width: '32px' }}></div>
      </div>

      <div className="content">
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '12px',
          marginBottom: '32px'
        }}>
          <img
            src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Crect width='100' height='100' fill='%2310b981'/%3E%3Ctext x='50' y='50' font-family='Arial' font-size='40' font-weight='bold' text-anchor='middle' dy='.3em' fill='white'%3EPH%3C/text%3E%3C/svg%3E"
            alt="PayHack"
            style={{
              width: '60px',
              height: '60px',
              borderRadius: '12px'
            }}
          />
          <div>
            <h2 style={{ fontSize: '20px', fontWeight: '600' }}>PayHack FinTech</h2>
            <p style={{ fontSize: '14px', color: '#666' }}>{t('loan.microLoan')}</p>
          </div>
        </div>

        <div style={{ marginBottom: '40px' }}>
          <p style={{
            fontSize: '16px',
            fontWeight: '500',
            textAlign: 'center',
            marginBottom: '24px'
          }}>
            {t('loan.howMuchBorrow')}
          </p>

          <div className="loan-amount">
            RM {loanAmount.toLocaleString()}
          </div>

          <div className="loan-slider">
            <input
              type="range"
              min="500"
              max={maxLoan}
              step="100"
              value={loanAmount}
              onChange={(e) => setLoanAmount(parseInt(e.target.value))}
              className="slider"
              style={{
                background: `linear-gradient(to right, #2563eb 0%, #2563eb ${(loanAmount - 500) / (maxLoan - 500) * 100}%, #e5e7eb ${(loanAmount - 500) / (maxLoan - 500) * 100}%, #e5e7eb 100%)`
              }}
            />
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              marginTop: '8px',
              fontSize: '12px',
              color: '#666'
            }}>
              <span>RM 500</span>
              <span>RM {maxLoan.toLocaleString()}</span>
            </div>
          </div>
        </div>

        <div className="loan-details">
          <div className="loan-detail-item">
            <p className="detail-label">{t('loan.estimatedMonthly')}</p>
            <p className="detail-value">RM {monthlyRepayment}</p>
          </div>
          <div className="loan-detail-item">
            <p className="detail-label">{t('loan.tenure')}</p>
            <p className="detail-value">{tenure} {t('loan.months')}</p>
          </div>
        </div>

        <div style={{
          backgroundColor: '#f8fafc',
          padding: '16px',
          borderRadius: '12px',
          marginBottom: '24px'
        }}>
          <h3 style={{ fontSize: '14px', fontWeight: '600', marginBottom: '12px' }}>
            {t('loan.loanDetails')}
          </h3>
          <div style={{ fontSize: '13px', color: '#666', lineHeight: '1.6' }}>
            <p style={{ marginBottom: '8px' }}>
              • {t('loan.interestRate')}: {(interestRate * 100).toFixed(0)}% {t('loan.perAnnum')}
            </p>
            <p style={{ marginBottom: '8px' }}>
              • {t('loan.processingFeeNote')}
            </p>
            <p style={{ marginBottom: '8px' }}>
              • {t('loan.earlySettlement')}
            </p>
            <p>
              • {t('loan.latePayment')}
            </p>
          </div>
        </div>

        <button
          className="btn-primary"
          onClick={handleApply}
        >
          {t('loan.applyWithPass')}
        </button>
      </div>

      {/* Consent Modal */}
      {showConsent && (
        <div className="modal-overlay" onClick={() => setShowConsent(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h3 style={{
              fontSize: '20px',
              fontWeight: '600',
              marginBottom: '16px',
              textAlign: 'center'
            }}>
              {t('loan.confirmApplication')}
            </h3>
            
            <p style={{
              fontSize: '14px',
              color: '#666',
              lineHeight: '1.6',
              marginBottom: '20px',
              textAlign: 'center'
            }}>
              {t('loan.applyingFor')} <strong>RM{loanAmount.toLocaleString()}</strong> {t('loan.loanFrom')}
            </p>
            
            <p style={{
              fontSize: '14px',
              color: '#666',
              marginBottom: '24px',
              textAlign: 'center'
            }}>
              {t('loan.doYouConsent')}
            </p>
            
            <div style={{ display: 'flex', gap: '12px' }}>
              <button
                onClick={() => setShowConsent(false)}
                style={{
                  flex: 1,
                  padding: '12px',
                  backgroundColor: '#f8fafc',
                  color: '#666',
                  border: '1px solid #e5e7eb',
                  borderRadius: '8px',
                  fontSize: '14px',
                  fontWeight: '500',
                  cursor: 'pointer'
                }}
              >
                {t('common.cancel')}
              </button>
              <button
                onClick={handleConfirm}
                style={{
                  flex: 1,
                  padding: '12px',
                  backgroundColor: '#2563eb',
                  color: 'white',
                  border: 'none',
                  borderRadius: '8px',
                  fontSize: '14px',
                  fontWeight: '500',
                  cursor: 'pointer'
                }}
              >
                {t('loan.confirmApply')}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default LoanApplication;