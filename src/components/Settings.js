import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Home, ShoppingBag, Store, Settings as SettingsIcon, ChevronRight, User, Lock, Building, Link, Globe, Bell, HelpCircle, FileText, LogOut, Download } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

function Settings({ userData, updateUserData }) {
  const navigate = useNavigate();
  const { t, currentLanguage } = useLanguage();
  const [biometricEnabled, setBiometricEnabled] = useState(true);

  const handleLogout = () => {
    if (window.confirm(t('settings.items.logoutConfirm'))) {
      // Clear user data and navigate to welcome page
      navigate('/');
    }
  };

  const handleExportData = () => {
    alert(t('settings.items.exportDataAlert'));
  };

  // Get language display name
  const getLanguageDisplayName = () => {
    switch(currentLanguage) {
      case 'MY': return 'Bahasa Melayu';
      case 'CN': return '中文';
      case 'IN': return 'தமிழ்';
      default: return 'English';
    }
  };

  const settingsSections = [
    {
      title: t('settings.sections.accountManagement'),
      items: [
        {
          icon: <User size={20} />,
          title: t('settings.items.userProfile'),
          subtitle: userData.name || 'User Name',
          type: 'info',
          content: (
            <div style={{
              backgroundColor: '#f8fafc',
              padding: '16px',
              borderRadius: '8px',
              fontSize: '14px'
            }}>
              <div style={{ marginBottom: '12px' }}>
                <p style={{ color: '#666', marginBottom: '4px' }}>{t('trustScore.billsSection.name')}</p>
                <p style={{ fontWeight: '500' }}>{userData.name || 'User Name'}</p>
              </div>
              <div style={{ marginBottom: '12px' }}>
                <p style={{ color: '#666', marginBottom: '4px' }}>{t('settings.items.myKadNo')}</p>
                <p style={{ fontWeight: '500' }}>****-**-1234</p>
              </div>
              <div style={{ marginBottom: '12px' }}>
                <p style={{ color: '#666', marginBottom: '4px' }}>{t('settings.items.email')}</p>
                <p style={{ fontWeight: '500' }}>
                  janet@email.com 
                  <button style={{ 
                    marginLeft: '8px', 
                    color: '#2563eb',
                    border: 'none',
                    background: 'none',
                    cursor: 'pointer',
                    fontSize: '12px'
                  }}>{t('common.edit')}</button>
                </p>
              </div>
              <div>
                <p style={{ color: '#666', marginBottom: '4px' }}>{t('settings.items.phoneNumber')}</p>
                <p style={{ fontWeight: '500' }}>
                  +6012-*** ****
                  <button style={{ 
                    marginLeft: '8px', 
                    color: '#2563eb',
                    border: 'none',
                    background: 'none',
                    cursor: 'pointer',
                    fontSize: '12px'
                  }}>{t('common.edit')}</button>
                </p>
              </div>
            </div>
          )
        },
        {
          icon: <Lock size={20} />,
          title: t('settings.items.security'),
          subtitle: t('settings.items.passwordBiometrics'),
          type: 'menu'
        }
      ]
    },
    {
      title: t('settings.sections.businessData'),
      items: [
        {
          icon: <Building size={20} />,
          title: t('settings.items.businessProfile'),
          subtitle: t('settings.items.editBusiness'),
          type: 'action',
          action: () => navigate('/digital-shop')
        },
        {
          icon: <FileText size={20} />,
          title: t('settings.items.credentials'),
          subtitle: userData.businessType === 'individual' ? '2 credentials' : '3 credentials',
          type: 'action',
          action: () => alert(t('settings.items.comingSoon'))
        },
        {
          icon: <Link size={20} />,
          title: t('settings.items.linkedAccounts'),
          subtitle: `${userData.connectedAccounts?.length || 0} ${t('settings.items.accountsConnected')}`,
          type: 'action',
          action: () => navigate('/trust-score-wallets')
        },
        {
          icon: <Download size={20} />,
          title: t('settings.items.exportPass'),
          subtitle: t('settings.items.downloadData'),
          type: 'action',
          action: handleExportData
        }
      ]
    },
    {
      title: t('settings.sections.appPreferences'),
      items: [
        {
          icon: <Globe size={20} />,
          title: t('settings.items.language'),
          subtitle: getLanguageDisplayName(),
          type: 'action',
          action: () => navigate('/language')
        },
        {
          icon: <Bell size={20} />,
          title: t('settings.items.notifications'),
          subtitle: t('settings.items.managePreferences'),
          type: 'action',
          action: () => alert(t('settings.items.comingSoon'))
        }
      ]
    },
    {
      title: t('settings.sections.supportLegal'),
      items: [
        {
          icon: <HelpCircle size={20} />,
          title: t('settings.items.helpCenter'),
          subtitle: '',
          type: 'link'
        },
        {
          icon: <FileText size={20} />,
          title: t('settings.items.privacyPolicy'),
          subtitle: '',
          type: 'link'
        },
        {
          icon: <FileText size={20} />,
          title: t('settings.items.termsOfService'),
          subtitle: '',
          type: 'link'
        }
      ]
    }
  ];

  const [expandedSection, setExpandedSection] = useState(null);

  return (
    <div className="mobile-container">
      <div className="header">
        <h1 className="header-title">{t('settings.title')}</h1>
        <div style={{ width: '32px' }}></div>
      </div>

      <div className="content">
        {settingsSections.map((section, sectionIndex) => (
          <div key={sectionIndex} style={{ marginBottom: '32px' }}>
            <h3 style={{
              fontSize: '16px',
              fontWeight: '600',
              color: '#666',
              marginBottom: '12px',
              paddingLeft: '4px'
            }}>
              {section.title}
            </h3>
            
            <div style={{
              backgroundColor: 'white',
              borderRadius: '12px',
              overflow: 'hidden',
              border: '1px solid #e5e7eb'
            }}>
              {section.items.map((item, itemIndex) => (
                <div key={itemIndex}>
                  {item.type === 'info' && expandedSection === `${sectionIndex}-${itemIndex}` ? (
                    <div>
                      <button
                        onClick={() => setExpandedSection(null)}
                        style={{
                          width: '100%',
                          padding: '16px',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                          backgroundColor: 'white',
                          border: 'none',
                          borderBottom: '1px solid #e5e7eb',
                          cursor: 'pointer'
                        }}
                      >
                        <div style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '16px'
                        }}>
                          <div style={{
                            width: '40px',
                            height: '40px',
                            backgroundColor: '#eff6ff',
                            borderRadius: '8px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            color: '#2563eb'
                          }}>
                            {item.icon}
                          </div>
                          <div style={{ textAlign: 'left' }}>
                            <p style={{
                              fontSize: '16px',
                              fontWeight: '500',
                              marginBottom: '2px'
                            }}>
                              {item.title}
                            </p>
                            {item.subtitle && (
                              <p style={{
                                fontSize: '13px',
                                color: '#666'
                              }}>
                                {item.subtitle}
                              </p>
                            )}
                          </div>
                        </div>
                        <ChevronRight 
                          size={20} 
                          color="#94a3b8" 
                          style={{ transform: 'rotate(90deg)' }}
                        />
                      </button>
                      <div style={{ padding: '16px' }}>
                        {item.content}
                      </div>
                    </div>
                  ) : item.title === t('settings.items.security') && expandedSection === `${sectionIndex}-${itemIndex}` ? (
                    <div>
                      <button
                        onClick={() => setExpandedSection(null)}
                        style={{
                          width: '100%',
                          padding: '16px',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                          backgroundColor: 'white',
                          border: 'none',
                          borderBottom: '1px solid #e5e7eb',
                          cursor: 'pointer'
                        }}
                      >
                        <div style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '16px'
                        }}>
                          <div style={{
                            width: '40px',
                            height: '40px',
                            backgroundColor: '#eff6ff',
                            borderRadius: '8px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            color: '#2563eb'
                          }}>
                            {item.icon}
                          </div>
                          <div style={{ textAlign: 'left' }}>
                            <p style={{
                              fontSize: '16px',
                              fontWeight: '500',
                              marginBottom: '2px'
                            }}>
                              {item.title}
                            </p>
                            {item.subtitle && (
                              <p style={{
                                fontSize: '13px',
                                color: '#666'
                              }}>
                                {item.subtitle}
                              </p>
                            )}
                          </div>
                        </div>
                        <ChevronRight 
                          size={20} 
                          color="#94a3b8" 
                          style={{ transform: 'rotate(90deg)' }}
                        />
                      </button>
                      <div style={{ 
                        backgroundColor: '#f8fafc',
                        padding: '16px'
                      }}>
                        <button
                          onClick={() => alert(t('settings.items.comingSoon'))}
                          style={{
                            width: '100%',
                            padding: '12px',
                            marginBottom: '12px',
                            backgroundColor: 'white',
                            border: '1px solid #e5e7eb',
                            borderRadius: '8px',
                            textAlign: 'left',
                            cursor: 'pointer'
                          }}
                        >
                          Change Password
                        </button>
                        <div style={{
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                          padding: '12px',
                          backgroundColor: 'white',
                          border: '1px solid #e5e7eb',
                          borderRadius: '8px',
                          marginBottom: '12px'
                        }}>
                          <span>Biometric Login</span>
                          <label style={{
                            position: 'relative',
                            display: 'inline-block',
                            width: '48px',
                            height: '28px'
                          }}>
                            <input
                              type="checkbox"
                              checked={biometricEnabled}
                              onChange={(e) => setBiometricEnabled(e.target.checked)}
                              style={{ display: 'none' }}
                            />
                            <span style={{
                              position: 'absolute',
                              cursor: 'pointer',
                              top: 0,
                              left: 0,
                              right: 0,
                              bottom: 0,
                              backgroundColor: biometricEnabled ? '#2563eb' : '#cbd5e1',
                              borderRadius: '34px',
                              transition: '0.4s'
                            }}>
                              <span style={{
                                position: 'absolute',
                                content: '',
                                height: '20px',
                                width: '20px',
                                left: biometricEnabled ? '24px' : '4px',
                                bottom: '4px',
                                backgroundColor: 'white',
                                borderRadius: '50%',
                                transition: '0.4s'
                              }}></span>
                            </span>
                          </label>
                        </div>
                        <button
                          onClick={() => alert(t('settings.items.comingSoon'))}
                          style={{
                            width: '100%',
                            padding: '12px',
                            backgroundColor: 'white',
                            border: '1px solid #e5e7eb',
                            borderRadius: '8px',
                            textAlign: 'left',
                            cursor: 'pointer'
                          }}
                        >
                          Manage Devices
                        </button>
                      </div>
                    </div>
                  ) : (
                    <button
                      onClick={() => {
                        if (item.type === 'action' && item.action) {
                          item.action();
                        } else if (item.type === 'info' || item.type === 'menu') {
                          setExpandedSection(`${sectionIndex}-${itemIndex}`);
                        } else if (item.type === 'link') {
                          alert(`Opening ${item.title}...`);
                        }
                      }}
                      style={{
                        width: '100%',
                        padding: '16px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        backgroundColor: 'white',
                        border: 'none',
                        borderBottom: itemIndex < section.items.length - 1 ? '1px solid #e5e7eb' : 'none',
                        cursor: 'pointer'
                      }}
                    >
                      <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '16px'
                      }}>
                        <div style={{
                          width: '40px',
                          height: '40px',
                          backgroundColor: '#eff6ff',
                          borderRadius: '8px',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          color: '#2563eb'
                        }}>
                          {item.icon}
                        </div>
                        <div style={{ textAlign: 'left' }}>
                          <p style={{
                            fontSize: '16px',
                            fontWeight: '500',
                            marginBottom: '2px'
                          }}>
                            {item.title}
                          </p>
                          {item.subtitle && (
                            <p style={{
                              fontSize: '13px',
                              color: '#666'
                            }}>
                              {item.subtitle}
                            </p>
                          )}
                        </div>
                      </div>
                      <ChevronRight size={20} color="#94a3b8" />
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>
        ))}

        {/* Logout Button */}
        <button
          onClick={handleLogout}
          style={{
            width: '100%',
            padding: '16px',
            backgroundColor: '#fee2e2',
            color: '#dc2626',
            border: 'none',
            borderRadius: '12px',
            fontSize: '16px',
            fontWeight: '500',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '8px',
            marginBottom: '20px'
          }}
        >
          <LogOut size={20} />
          {t('settings.items.logout')}
        </button>

        {/* App Version */}
        <p style={{
          textAlign: 'center',
          fontSize: '12px',
          color: '#94a3b8'
        }}>
          {t('settings.items.version')} 1.0.0
        </p>
      </div>

      {/* Bottom Navigation */}
      <div className="bottom-nav">
        <div className="nav-item" onClick={() => navigate('/pass-hub')}>
          <Home size={24} />
          <span className="nav-label">{t('bottomNav.pass')}</span>
        </div>
        <div className="nav-item" onClick={() => navigate('/marketplace')}>
          <ShoppingBag size={24} />
          <span className="nav-label">{t('bottomNav.marketplace')}</span>
        </div>
        <div className="nav-item" onClick={() => navigate('/my-kiosk')}>
          <Store size={24} />
          <span className="nav-label">{t('bottomNav.myKiosk')}</span>
        </div>
        <div className="nav-item active">
          <SettingsIcon size={24} />
          <span className="nav-label">{t('bottomNav.settings')}</span>
        </div>
      </div>
    </div>
  );
}

export default Settings;