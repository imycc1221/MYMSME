import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Check, Download, FileText } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

function PolicyConfirmation({ userData }) {
  const navigate = useNavigate();
  const location = useLocation();
  const { t } = useLanguage();
  const { selectedPlan, beneficiary } = location.state || {};
  
  // Generate policy number
  const policyNumber = `POL${Date.now().toString().slice(-8)}`;
  const nextPaymentDate = new Date();
  nextPaymentDate.setMonth(nextPaymentDate.getMonth() + 1);

  const handleDownloadPDF = () => {
    alert(t('policyConfirmation.pdfDownload'));
  };

  return (
    <div className="mobile-container">
      <div className="content">
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          padding: '40px 20px'
        }}>
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            marginBottom: '40px'
          }}>
            <div className="success-icon" style={{ marginBottom: '24px' }}>
              <Check size={40} color="white" />
            </div>
            <h1 style={{
              fontSize: '28px',
              fontWeight: '700',
              marginBottom: '12px',
              textAlign: 'center'
            }}>
              {t('policyConfirmation.youreCovered')}
            </h1>
            <p style={{
              fontSize: '16px',
              color: '#666',
              textAlign: 'center'
            }}>
              {t('policyConfirmation.policyActive')}
            </p>
          </div>

          <div className="card" style={{
            backgroundColor: '#f8fafc',
            padding: '24px',
            marginBottom: '24px'
          }}>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginBottom: '20px'
            }}>
              <h3 style={{
                fontSize: '20px',
                fontWeight: '600'
              }}>
                {selectedPlan?.name || 'Insurance Policy'}
              </h3>
              <div style={{
                backgroundColor: '#10b981',
                color: 'white',
                padding: '4px 12px',
                borderRadius: '20px',
                fontSize: '12px',
                fontWeight: '500'
              }}>
                {t('policyConfirmation.active')}
              </div>
            </div>

            <div style={{ marginBottom: '16px' }}>
              <p style={{
                fontSize: '13px',
                color: '#666',
                marginBottom: '4px'
              }}>
                {t('policyConfirmation.policyNumber')}
              </p>
              <p style={{
                fontSize: '16px',
                fontWeight: '600',
                fontFamily: 'monospace'
              }}>
                {policyNumber}
              </p>
            </div>

            <div style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: '16px',
              marginBottom: '16px'
            }}>
              <div>
                <p style={{
                  fontSize: '13px',
                  color: '#666',
                  marginBottom: '4px'
                }}>
                  {t('policyConfirmation.coverageAmount')}
                </p>
                <p style={{
                  fontSize: '16px',
                  fontWeight: '600'
                }}>
                  {selectedPlan?.keyBenefit || 'RM 5,000'}
                </p>
              </div>
              <div>
                <p style={{
                  fontSize: '13px',
                  color: '#666',
                  marginBottom: '4px'
                }}>
                  {t('policyConfirmation.monthlyPremium')}
                </p>
                <p style={{
                  fontSize: '16px',
                  fontWeight: '600'
                }}>
                  {selectedPlan?.premium || 'RM 15.00'}
                </p>
              </div>
            </div>

            <div style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: '16px'
            }}>
              <div>
                <p style={{
                  fontSize: '13px',
                  color: '#666',
                  marginBottom: '4px'
                }}>
                  {t('policyConfirmation.startDate')}
                </p>
                <p style={{
                  fontSize: '16px',
                  fontWeight: '600'
                }}>
                  {new Date().toLocaleDateString('en-MY')}
                </p>
              </div>
              <div>
                <p style={{
                  fontSize: '13px',
                  color: '#666',
                  marginBottom: '4px'
                }}>
                  {t('policyConfirmation.nextPayment')}
                </p>
                <p style={{
                  fontSize: '16px',
                  fontWeight: '600'
                }}>
                  {nextPaymentDate.toLocaleDateString('en-MY')}
                </p>
              </div>
            </div>
          </div>

          <div style={{
            backgroundColor: '#eff6ff',
            padding: '16px',
            borderRadius: '12px',
            marginBottom: '32px',
            display: 'flex',
            alignItems: 'center',
            gap: '12px'
          }}>
            <FileText size={20} color="#2563eb" />
            <p style={{
              fontSize: '14px',
              color: '#2563eb',
              flex: 1
            }}>
              {t('policyConfirmation.policyAdded')}
            </p>
          </div>

          <div style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '12px'
          }}>
            <button
              className="btn-primary"
              onClick={handleDownloadPDF}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px'
              }}
            >
              <Download size={20} />
              {t('policyConfirmation.downloadPDF')}
            </button>
            
            <button
              className="btn-secondary"
              onClick={() => navigate('/marketplace')}
            >
              {t('policyConfirmation.backToMarketplace')}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PolicyConfirmation;