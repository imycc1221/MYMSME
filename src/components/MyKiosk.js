import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Home, ShoppingBag, Store, Settings, Plus, Receipt, TrendingUp, Clock, Award, Users } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

function MyKiosk({ userData }) {
  const navigate = useNavigate();
  const { t } = useLanguage();
  const [totalSales, setTotalSales] = useState(285.50);
  const [transactionCount, setTransactionCount] = useState(35);
  const [showCashEntry, setShowCashEntry] = useState(false);
  const [cashAmount, setCashAmount] = useState('');
  const [showReceipt, setShowReceipt] = useState(false);
  const [receiptData, setReceiptData] = useState(null);
  const [dateView, setDateView] = useState('today');

  // Mock sales data for the week
  const salesHistory = [
    { day: 'Mon', amount: 210 },
    { day: 'Tue', amount: 185 },
    { day: 'Wed', amount: 290 },
    { day: 'Thu', amount: 265 },
    { day: 'Fri', amount: 285.50 },
    { day: 'Sat', amount: 0 },
    { day: 'Sun', amount: 0 }
  ];

  const handleAddCashSale = () => {
    if (cashAmount) {
      const amount = parseFloat(cashAmount);
      setTotalSales(totalSales + amount);
      setTransactionCount(transactionCount + 1);
      setCashAmount('');
      setShowCashEntry(false);
    }
  };

  const handleCreateReceipt = () => {
    const receiptId = `RCP${Date.now().toString().slice(-8)}`;
    const newReceipt = {
      id: receiptId,
      shopName: userData.shopName || 'My Business',
      date: new Date().toLocaleDateString('en-MY'),
      time: new Date().toLocaleTimeString('en-MY', { hour: '2-digit', minute: '2-digit' }),
      amount: '',
      description: ''
    };
    setReceiptData(newReceipt);
    setShowReceipt(true);
  };

  // Calculate performance
  const yesterdaySales = 248.50;
  const percentChange = ((totalSales - yesterdaySales) / yesterdaySales * 100).toFixed(0);
  const isUp = percentChange > 0;

  if (showCashEntry) {
    return (
      <div className="mobile-container">
        <div className="header">
          <button className="back-button" onClick={() => setShowCashEntry(false)}>
            ×
          </button>
          <h1 className="header-title">{t('myKiosk.logCashSale')}</h1>
          <div style={{ width: '32px' }}></div>
        </div>

        <div className="content" style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          paddingTop: '60px'
        }}>
          <p style={{
            fontSize: '16px',
            color: '#666',
            marginBottom: '32px'
          }}>
            {t('myKiosk.enterSaleAmount')}
          </p>

          <div style={{
            fontSize: '48px',
            fontWeight: '700',
            marginBottom: '40px',
            color: '#2563eb'
          }}>
            RM {cashAmount || '0.00'}
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: '12px',
            maxWidth: '300px',
            marginBottom: '24px'
          }}>
            {[1, 2, 3, 4, 5, 6, 7, 8, 9, '.', 0, '←'].map((num) => (
              <button
                key={num}
                onClick={() => {
                  if (num === '←') {
                    setCashAmount(cashAmount.slice(0, -1));
                  } else {
                    setCashAmount(cashAmount + num);
                  }
                }}
                style={{
                  padding: '20px',
                  fontSize: '24px',
                  fontWeight: '500',
                  backgroundColor: '#f8fafc',
                  border: '1px solid #e5e7eb',
                  borderRadius: '12px',
                  cursor: 'pointer'
                }}
              >
                {num}
              </button>
            ))}
          </div>

          <button
            className="btn-primary"
            onClick={handleAddCashSale}
            disabled={!cashAmount || parseFloat(cashAmount) === 0}
            style={{ maxWidth: '300px' }}
          >
            {t('myKiosk.addSale')}
          </button>
        </div>
      </div>
    );
  }

  if (showReceipt && receiptData) {
    return (
      <div className="mobile-container">
        <div className="header">
          <button className="back-button" onClick={() => setShowReceipt(false)}>
            ×
          </button>
          <h1 className="header-title">{t('myKiosk.createEReceipt')}</h1>
          <div style={{ width: '32px' }}></div>
        </div>

        <div className="content">
          <div className="form-group">
            <label className="form-label">{t('trustScore.billsSection.amount')} (RM)</label>
            <input
              type="number"
              className="form-input"
              placeholder="0.00"
              value={receiptData.amount}
              onChange={(e) => setReceiptData({...receiptData, amount: e.target.value})}
            />
          </div>

          <div className="form-group">
            <label className="form-label">{t('myKiosk.itemDescription')}</label>
            <input
              type="text"
              className="form-input"
              placeholder={t('myKiosk.itemPlaceholder')}
              value={receiptData.description}
              onChange={(e) => setReceiptData({...receiptData, description: e.target.value})}
            />
          </div>

          <div className="card" style={{
            backgroundColor: '#f8fafc',
            marginTop: '32px',
            marginBottom: '32px'
          }}>
            <h3 style={{
              fontSize: '18px',
              fontWeight: '600',
              textAlign: 'center',
              marginBottom: '16px'
            }}>
              {receiptData.shopName}
            </h3>
            <div style={{
              fontSize: '14px',
              color: '#666',
              textAlign: 'center',
              marginBottom: '20px'
            }}>
              <p>{receiptData.date} • {receiptData.time}</p>
              <p style={{ marginTop: '4px' }}>{t('myKiosk.receiptId')}: {receiptData.id}</p>
            </div>
            {receiptData.description && (
              <p style={{
                fontSize: '16px',
                marginBottom: '12px'
              }}>
                {receiptData.description}
              </p>
            )}
            <p style={{
              fontSize: '24px',
              fontWeight: '700',
              textAlign: 'center',
              color: '#2563eb'
            }}>
              RM {receiptData.amount || '0.00'}
            </p>
          </div>

          <button
            className="btn-primary"
            onClick={() => {
              alert(t('myKiosk.receiptGenerated'));
              setShowReceipt(false);
            }}
            disabled={!receiptData.amount || parseFloat(receiptData.amount) === 0}
          >
            {t('myKiosk.generateReceipt')}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="mobile-container">
      <div className="header">
        <h1 className="header-title">{t('myKiosk.title')}</h1>
        <div style={{ width: '32px' }}></div>
      </div>

      <div className="content">
        {/* Date Selector */}
        <div style={{
          display: 'flex',
          gap: '8px',
          marginBottom: '20px'
        }}>
          {[
            { key: 'today', label: t('myKiosk.today') },
            { key: 'week', label: t('myKiosk.thisWeek') },
            { key: 'month', label: t('myKiosk.thisMonth') }
          ].map((view) => (
            <button
              key={view.key}
              onClick={() => setDateView(view.key)}
              style={{
                padding: '8px 16px',
                backgroundColor: dateView === view.key ? '#2563eb' : '#f8fafc',
                color: dateView === view.key ? 'white' : '#666',
                border: 'none',
                borderRadius: '8px',
                fontSize: '14px',
                fontWeight: '500',
                cursor: 'pointer',
                textTransform: 'capitalize'
              }}
            >
              {view.label}
            </button>
          ))}
        </div>

        {/* Performance Snapshot */}
        <div className="card" style={{
          background: 'linear-gradient(135deg, #2563eb 0%, #1e40af 100%)',
          color: 'white',
          marginBottom: '24px'
        }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginBottom: '16px'
          }}>
            <div>
              <p style={{
                fontSize: '14px',
                opacity: 0.9,
                marginBottom: '8px'
              }}>
                {t('myKiosk.totalSales')}
              </p>
              <p style={{
                fontSize: '36px',
                fontWeight: '700'
              }}>
                RM {totalSales.toFixed(2)}
              </p>
              <p style={{
                fontSize: '14px',
                opacity: 0.9,
                marginTop: '4px'
              }}>
                {transactionCount} {t('myKiosk.transactions')}
              </p>
            </div>
            <div style={{
              width: '60px',
              height: '60px',
              backgroundColor: 'rgba(255, 255, 255, 0.2)',
              borderRadius: '12px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <TrendingUp size={32} />
            </div>
          </div>
          
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            padding: '12px',
            backgroundColor: 'rgba(255, 255, 255, 0.1)',
            borderRadius: '8px'
          }}>
            <span style={{ fontSize: '20px' }}>
              {isUp ? '📈' : '📉'}
            </span>
            <span style={{
              fontSize: '14px',
              fontWeight: '500'
            }}>
              {isUp ? t('myKiosk.upFrom') : t('myKiosk.downFrom')} {Math.abs(percentChange)}% {t('myKiosk.fromYesterday')}
            </span>
            <span style={{
              fontSize: '14px',
              opacity: 0.9
            }}>
              • {t('myKiosk.busiestDay')}
            </span>
          </div>
        </div>

        {/* Quick Actions */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '12px',
          marginBottom: '32px'
        }}>
          <button
            onClick={() => setShowCashEntry(true)}
            style={{
              padding: '24px',
              backgroundColor: '#2563eb',
              color: 'white',
              border: 'none',
              borderRadius: '12px',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '8px',
              cursor: 'pointer',
              transition: 'all 0.3s ease'
            }}
          >
            <Plus size={28} />
            <span style={{ fontSize: '14px', fontWeight: '500' }}>
              {t('myKiosk.logCashSale')}
            </span>
          </button>
          
          <button
            onClick={handleCreateReceipt}
            style={{
              padding: '24px',
              backgroundColor: '#10b981',
              color: 'white',
              border: 'none',
              borderRadius: '12px',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '8px',
              cursor: 'pointer',
              transition: 'all 0.3s ease'
            }}
          >
            <Receipt size={28} />
            <span style={{ fontSize: '14px', fontWeight: '500' }}>
              {t('myKiosk.createEReceipt')}
            </span>
          </button>
        </div>

        {/* Business Insights */}
        <div style={{ marginBottom: '24px' }}>
          <h3 style={{
            fontSize: '18px',
            fontWeight: '600',
            marginBottom: '16px'
          }}>
            {t('myKiosk.businessInsights')}
          </h3>

          {/* Sales History */}
          <button
            onClick={() => alert(t('myKiosk.salesHistoryComing'))}
            className="card"
            style={{
              width: '100%',
              padding: '20px',
              marginBottom: '16px',
              cursor: 'pointer',
              border: '1px solid #e5e7eb',
              textAlign: 'left'
            }}
          >
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginBottom: '16px'
            }}>
              <h4 style={{
                fontSize: '16px',
                fontWeight: '600',
                display: 'flex',
                alignItems: 'center',
                gap: '8px'
              }}>
                <Clock size={20} color="#2563eb" />
                {t('myKiosk.salesHistory')}
              </h4>
              <span style={{ color: '#94a3b8' }}>→</span>
            </div>
            
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'flex-end',
              height: '60px',
              gap: '4px'
            }}>
              {salesHistory.map((day, index) => (
                <div
                  key={index}
                  style={{
                    flex: 1,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'flex-end'
                  }}
                >
                  <div
                    style={{
                      width: '100%',
                      backgroundColor: index === 4 ? '#2563eb' : '#e5e7eb',
                      borderRadius: '4px 4px 0 0',
                      height: `${(day.amount / 290) * 40}px`,
                      minHeight: '2px'
                    }}
                  />
                  <span style={{
                    fontSize: '10px',
                    color: '#666',
                    marginTop: '4px'
                  }}>
                    {day.day}
                  </span>
                </div>
              ))}
            </div>
          </button>

          {/* My Credentials */}
          <button
            onClick={() => alert(t('myKiosk.credentialsComing'))}
            className="card"
            style={{
              width: '100%',
              padding: '20px',
              marginBottom: '16px',
              cursor: 'pointer',
              border: '1px solid #e5e7eb',
              textAlign: 'left'
            }}
          >
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between'
            }}>
              <div>
                <h4 style={{
                  fontSize: '16px',
                  fontWeight: '600',
                  marginBottom: '8px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px'
                }}>
                  <Award size={20} color="#f59e0b" />
                  {t('myKiosk.myCredentials')}
                </h4>
                <div style={{ fontSize: '14px', color: '#666' }}>
                  <p>{t('myKiosk.foodHandling')}</p>
                  <p>{t('myKiosk.ecommerceGrad')}</p>
                </div>
              </div>
              <span style={{ color: '#94a3b8' }}>→</span>
            </div>
          </button>

          {/* Supplier Directory */}
          <button
            onClick={() => alert(t('myKiosk.suppliersComing'))}
            className="card"
            style={{
              width: '100%',
              padding: '20px',
              cursor: 'pointer',
              border: '1px solid #e5e7eb',
              textAlign: 'left'
            }}
          >
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between'
            }}>
              <div>
                <h4 style={{
                  fontSize: '16px',
                  fontWeight: '600',
                  marginBottom: '8px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px'
                }}>
                  <Users size={20} color="#10b981" />
                  {t('myKiosk.supplierDirectory')}
                </h4>
                <p style={{ fontSize: '14px', color: '#666' }}>
                  {t('myKiosk.findSuppliers')}
                </p>
              </div>
              <span style={{ color: '#94a3b8' }}>→</span>
            </div>
          </button>
        </div>
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
        <div className="nav-item active">
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

export default MyKiosk;