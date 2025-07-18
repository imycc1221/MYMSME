import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, Shield, Package, ChevronRight } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

function InsurancePlans({ userData }) {
  const navigate = useNavigate();
  const { t } = useLanguage();

  const plans = [
    {
      id: 'stall-inventory',
      name: t('insurance.stallInventoryCover'),
      keyBenefit: `${t('insurance.upTo')} RM5,000 ${t('insurance.forStockDamage')}`,
      premium: `${t('insurance.fromMonthly')} RM15 ${t('insurance.perMonth')}`,
      icon: '📦',
      color: '#f59e0b',
      features: [
        t('insurance.fireProtection'),
        t('insurance.floodCoverage'),
        t('insurance.theftProtection'),
        t('insurance.equipmentBreakdown')
      ]
    },
    {
      id: 'personal-accident',
      name: t('insurance.personalAccidentPlus'),
      keyBenefit: `${t('insurance.upTo')} RM10,000 ${t('insurance.forPersonalInjury')}`,
      premium: `${t('insurance.fromMonthly')} RM25 ${t('insurance.perMonth')}`,
      icon: '🏥',
      color: '#10b981',
      features: [
        t('insurance.accidentalDeath'),
        t('insurance.medicalExpenses'),
        t('insurance.hospitalIncome'),
        t('insurance.permanentDisability')
      ]
    }
  ];

  const handlePlanSelect = (plan) => {
    navigate('/insurance-application', { state: { selectedPlan: plan } });
  };

  return (
    <div className="mobile-container">
      <div className="header">
        <button className="back-button" onClick={() => navigate(-1)}>
          <ChevronLeft />
        </button>
        <h1 className="header-title">{t('insurance.microInsurance')}</h1>
        <div style={{ width: '32px' }}></div>
      </div>

      <div className="content">
        <p style={{
          fontSize: '16px',
          color: '#666',
          textAlign: 'center',
          marginBottom: '32px'
        }}>
          {t('insurance.protectBusiness')}
        </p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          {plans.map((plan) => (
            <div
              key={plan.id}
              className="card"
              style={{
                padding: '24px',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                border: '2px solid transparent'
              }}
              onClick={() => handlePlanSelect(plan)}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = plan.color;
                e.currentTarget.style.transform = 'translateY(-2px)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = 'transparent';
                e.currentTarget.style.transform = 'translateY(0)';
              }}
            >
              <div style={{
                display: 'flex',
                alignItems: 'flex-start',
                justifyContent: 'space-between',
                marginBottom: '16px'
              }}>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '16px'
                }}>
                  <div style={{
                    width: '56px',
                    height: '56px',
                    backgroundColor: `${plan.color}20`,
                    borderRadius: '12px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '28px'
                  }}>
                    {plan.icon}
                  </div>
                  <div>
                    <h3 style={{
                      fontSize: '18px',
                      fontWeight: '600',
                      marginBottom: '4px'
                    }}>
                      {plan.name}
                    </h3>
                    <p style={{
                      fontSize: '14px',
                      color: '#666'
                    }}>
                      {plan.keyBenefit}
                    </p>
                  </div>
                </div>
                <ChevronRight size={20} color="#94a3b8" />
              </div>

              <div style={{
                backgroundColor: '#f8fafc',
                padding: '16px',
                borderRadius: '8px',
                marginBottom: '16px'
              }}>
                <p style={{
                  fontSize: '20px',
                  fontWeight: '600',
                  color: plan.color,
                  marginBottom: '4px'
                }}>
                  {plan.premium}
                </p>
                <p style={{
                  fontSize: '12px',
                  color: '#666'
                }}>
                  {t('insurance.protectBusiness')}
                </p>
              </div>

              <div>
                <p style={{
                  fontSize: '14px',
                  fontWeight: '500',
                  marginBottom: '12px',
                  color: '#1a1a1a'
                }}>
                  {t('insurance.whatsIncluded')}
                </p>
                <ul style={{
                  listStyleType: 'none',
                  padding: 0,
                  margin: 0
                }}>
                  {plan.features.map((feature, index) => (
                    <li
                      key={index}
                      style={{
                        fontSize: '13px',
                        color: '#666',
                        marginBottom: '8px',
                        paddingLeft: '20px',
                        position: 'relative'
                      }}
                    >
                      <span style={{
                        position: 'absolute',
                        left: 0,
                        color: plan.color
                      }}>✓</span>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>

              <button
                className="btn-primary"
                style={{
                  marginTop: '20px',
                  backgroundColor: plan.color
                }}
                onClick={(e) => {
                  e.stopPropagation();
                  handlePlanSelect(plan);
                }}
              >
                {t('insurance.learnMoreApply')}
              </button>
            </div>
          ))}
        </div>

        <div style={{
          backgroundColor: '#eff6ff',
          padding: '16px',
          borderRadius: '12px',
          marginTop: '24px'
        }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            marginBottom: '8px'
          }}>
            <Shield size={20} color="#2563eb" />
            <p style={{
              fontSize: '14px',
              fontWeight: '500',
              color: '#2563eb'
            }}>
              {t('insurance.whyInsured')}
            </p>
          </div>
          <p style={{
            fontSize: '13px',
            color: '#666',
            lineHeight: '1.6'
          }}>
            {t('insurance.insuranceDescription')}
          </p>
        </div>
      </div>
    </div>
  );
}

export default InsurancePlans;