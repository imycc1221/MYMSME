import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { ChevronLeft, User, FileText } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

function InsuranceApplication({ userData }) {
  const navigate = useNavigate();
  const location = useLocation();
  const { t } = useLanguage();
  const selectedPlan = location.state?.selectedPlan || {};
  
  const [beneficiaryName, setBeneficiaryName] = useState('');
  const [beneficiaryNRIC, setBeneficiaryNRIC] = useState('');
  const [relationship, setRelationship] = useState('');
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [showPayment, setShowPayment] = useState(false);

  const businessName = userData.businessType === 'individual' 
    ? userData.shopName 
    : userData.businessData?.name;

  const handleProceedToPayment = () => {
    if (beneficiaryName && beneficiaryNRIC && relationship && termsAccepted) {
      setShowPayment(true);
    }
  };

  const handleConfirmPayment = () => {
    // Simulate payment processing
    setTimeout(() => {
      navigate('/policy-confirmation', { 
        state: { 
          selectedPlan,
          beneficiary: {
            name: beneficiaryName,
            nric: beneficiaryNRIC,
            relationship
          }
        } 
      });
    }, 1500);
  };

  if (showPayment) {
    return (
      <div className="mobile-container">
        <div className="header">
          <button className="back-button" onClick={() => setShowPayment(false)}>
            <ChevronLeft />
          </button>
          <h1 className="header-title">{t('insuranceApplication.paymentSummary')}</h1>
          <div style={{ width: '32px' }}></div>
        </div>

        <div className="content">
          <div className="card" style={{ marginBottom: '24px' }}>
            <h3 style={{
              fontSize: '18px',
              fontWeight: '600',
              marginBottom: '16px'
            }}>
              {selectedPlan.name}
            </h3>
            
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              padding: '12px 0',
              borderBottom: '1px solid #e5e7eb'
            }}>
              <span style={{ color: '#666' }}>{t('insuranceApplication.firstMonthPremium')}</span>
              <span style={{ fontWeight: '600' }}>{selectedPlan.premium}</span>
            </div>
            
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              padding: '12px 0',
              borderBottom: '1px solid #e5e7eb'
            }}>
              <span style={{ color: '#666' }}>{t('insuranceApplication.processingFee')}</span>
              <span style={{ fontWeight: '600' }}>RM 0.00</span>
            </div>
            
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              padding: '16px 0 0 0'
            }}>
              <span style={{ fontSize: '18px', fontWeight: '600' }}>{t('insuranceApplication.total')}</span>
              <span style={{ 
                fontSize: '18px', 
                fontWeight: '600',
                color: selectedPlan.color 
              }}>
                {selectedPlan.premium}
              </span>
            </div>
          </div>

          <div style={{
            backgroundColor: '#eff6ff',
            padding: '16px',
            borderRadius: '12px',
            marginBottom: '32px'
          }}>
            <p style={{
              fontSize: '14px',
              color: '#2563eb',
              fontWeight: '500',
              marginBottom: '8px'
            }}>
              {t('insuranceApplication.paymentMethod')}
            </p>
            <p style={{
              fontSize: '13px',
              color: '#666'
            }}>
              {t('insuranceApplication.automaticDeduction')}
            </p>
          </div>

          <button
            className="btn-primary"
            onClick={handleConfirmPayment}
          >
            {t('insuranceApplication.confirmPayment')}
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
        <h1 className="header-title">{selectedPlan.name} </h1>
        <div style={{ width: '32px' }}></div>
      </div>

      <div className="content">
        <div style={{ marginBottom: '32px' }}>
          <h3 style={{
            fontSize: '18px',
            fontWeight: '600',
            marginBottom: '20px',
            display: 'flex',
            alignItems: 'center',
            gap: '8px'
          }}>
            <User size={20} />
            {t('insuranceApplication.yourDetails')}
          </h3>
          
          <div style={{
            backgroundColor: '#f8fafc',
            padding: '20px',
            borderRadius: '12px'
          }}>
            <div style={{ marginBottom: '16px' }}>
              <p style={{ fontSize: '13px', color: '#666', marginBottom: '4px' }}>
                {t('insuranceApplication.fullName')}
              </p>
              <p style={{ fontSize: '16px', fontWeight: '500' }}>
                {userData.name || 'User Name'}
              </p>
            </div>
            
            <div style={{ marginBottom: '16px' }}>
              <p style={{ fontSize: '13px', color: '#666', marginBottom: '4px' }}>
                {t('insuranceApplication.nric')}
              </p>
              <p style={{ fontSize: '16px', fontWeight: '500' }}>
                ****-**-1234
              </p>
            </div>
            
            <div style={{ marginBottom: '16px' }}>
              <p style={{ fontSize: '13px', color: '#666', marginBottom: '4px' }}>
                {t('insuranceApplication.businessName')}
              </p>
              <p style={{ fontSize: '16px', fontWeight: '500' }}>
                {businessName || 'My Business'}
              </p>
            </div>
            
            <div>
              <p style={{ fontSize: '13px', color: '#666', marginBottom: '4px' }}>
                {t('insuranceApplication.businessAddress')}
              </p>
              <p style={{ fontSize: '16px', fontWeight: '500' }}>
                {userData.location || 'Business Address'}
              </p>
            </div>
          </div>
        </div>

        <div style={{ marginBottom: '32px' }}>
          <h3 style={{
            fontSize: '18px',
            fontWeight: '600',
            marginBottom: '12px',
            display: 'flex',
            alignItems: 'center',
            gap: '8px'
          }}>
            <FileText size={20} />
            {t('insuranceApplication.beneficiaryInfo')}
          </h3>
          
          <p style={{
            fontSize: '14px',
            color: '#666',
            marginBottom: '20px'
          }}>
            {t('insuranceApplication.beneficiaryQuestion')}
          </p>

          <div className="form-group">
            <label className="form-label">{t('insuranceApplication.beneficiaryFullName')}</label>
            <input
              type="text"
              className="form-input"
              placeholder={t('insuranceApplication.enterFullName')}
              value={beneficiaryName}
              onChange={(e) => setBeneficiaryName(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label className="form-label">{t('insuranceApplication.beneficiaryNRIC')}</label>
            <input
              type="text"
              className="form-input"
              placeholder={t('insuranceApplication.nricPlaceholder')}
              value={beneficiaryNRIC}
              onChange={(e) => setBeneficiaryNRIC(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label className="form-label">{t('insuranceApplication.relationship')}</label>
            <select
              className="form-input"
              value={relationship}
              onChange={(e) => setRelationship(e.target.value)}
            >
              <option value="">{t('insuranceApplication.selectRelationship')}</option>
              <option value="spouse">{t('insuranceApplication.spouse')}</option>
              <option value="child">{t('insuranceApplication.child')}</option>
              <option value="parent">{t('insuranceApplication.parent')}</option>
              <option value="sibling">{t('insuranceApplication.sibling')}</option>
              <option value="other">{t('insuranceApplication.other')}</option>
            </select>
          </div>
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
            checked={termsAccepted}
            onChange={(e) => setTermsAccepted(e.target.checked)}
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
            {t('insuranceApplication.termsAgreement')} <a href="#" style={{ color: '#2563eb', textDecoration: 'underline' }}>{t('insuranceApplication.policyTerms')}</a>
          </span>
        </label>

        <button
          className="btn-primary"
          onClick={handleProceedToPayment}
          disabled={!beneficiaryName || !beneficiaryNRIC || !relationship || !termsAccepted}
        >
          {t('insuranceApplication.proceedPayment')}
        </button>
      </div>
    </div>
  );
}

export default InsuranceApplication;