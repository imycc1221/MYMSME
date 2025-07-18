import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, Zap, Droplets, Phone, Upload, Check } from 'lucide-react';
import FileUpload from './FileUpload';
import { useLanguage } from '../contexts/LanguageContext';

// Import bill logos
import tnbLogo from 'C:\\Users\\yanch\\mymsme-pass\\src\\assets\\images\\tnb.jpg';
import waterLogo from 'C:\\Users\\yanch\\mymsme-pass\\src\\assets\\images\\Indah Water (New).png';

function TrustScoreBills({ updateUserData, userData }) {
  const navigate = useNavigate();
  const { t } = useLanguage();
  const [bills, setBills] = useState({
    electricity: null,
    water: null,
    phone: null
  });
  const [showFileUpload, setShowFileUpload] = useState(false);
  const [currentBillType, setCurrentBillType] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [showOCR, setShowOCR] = useState(false);
  const [ocrData, setOcrData] = useState(null);

  const billTypes = [
    { 
      id: 'electricity', 
      name: t('trustScore.billsSection.electricityBill'), 
      icon: Zap, 
      color: '#f59e0b',
      logo: tnbLogo 
    },
    { 
      id: 'water', 
      name: t('trustScore.billsSection.waterBill'), 
      icon: Droplets, 
      color: '#3b82f6',
      logo: waterLogo 
    },
    { 
      id: 'phone', 
      name: t('trustScore.billsSection.phoneBill'), 
      icon: Phone, 
      color: '#10b981',
      logo: null // No logo for phone bill, will use icon
    }
  ];

  const handleUploadClick = (billType) => {
    setCurrentBillType(billType);
    setShowFileUpload(true);
  };

  const handleFileSelect = (file) => {
    setShowFileUpload(false);
    setShowOCR(true);
    
    // Simulate OCR processing
    setTimeout(() => {
      const mockData = {
        electricity: { name: userData.name || 'Tan Hui Xin', address: 'Asia Pacific University, KL', amount: 'RM 85.50' },
        water: { name: userData.name || 'Tan Hui Xin', address: 'Asia Pacific University, KL', amount: 'RM 45.20' },
        phone: { name: userData.name || 'Tan Hui Xin', address: 'Asia Pacific University, KL', amount: 'RM 98.00' }
      };
      
      setOcrData(mockData[currentBillType]);
      setShowOCR(false);
    }, 2000);
  };

  const confirmOCR = () => {
    setBills({ ...bills, [currentBillType]: ocrData });
    setOcrData(null);
  };

  const allBillsUploaded = bills.electricity && bills.water && bills.phone;

  const handleGenerateTrustScore = () => {
    setIsGenerating(true);
    updateUserData({ bills });
    
    // Calculate trust score
    const baseScore = 300;
    const eWalletScore = (userData.connectedAccounts?.length || 0) * 100;
    const billScore = 150;
    const totalScore = baseScore + eWalletScore + billScore;
    
    setTimeout(() => {
      updateUserData({ trustScore: totalScore });
      navigate('/pass-hub');
    }, 3000);
  };

  if (showFileUpload) {
    return (
      <FileUpload
        onFileSelect={handleFileSelect}
        onBack={() => setShowFileUpload(false)}
        accept="image/*,.pdf"
        title={`${t('common.upload')} ${billTypes.find(b => b.id === currentBillType)?.name}`}
      />
    );
  }

  if (showOCR) {
    return (
      <div className="mobile-container">
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <p>{t('trustScore.billsSection.analyzingOCR')}</p>
        </div>
      </div>
    );
  }

  if (ocrData) {
    return (
      <div className="mobile-container">
        <div className="header">
          <h1 className="header-title">{t('trustScore.billsSection.confirmDetails')}</h1>
          <div style={{ width: '32px' }}></div>
        </div>
        <div className="content">
          <div className="card">
            <h3 style={{ marginBottom: '20px' }}>{t('trustScore.billsSection.extractedInfo')}</h3>
            <div style={{ marginBottom: '16px' }}>
              <p style={{ fontSize: '14px', color: '#666' }}>{t('trustScore.billsSection.name')}</p>
              <p style={{ fontSize: '16px', fontWeight: '500' }}>{ocrData.name}</p>
            </div>
            <div style={{ marginBottom: '16px' }}>
              <p style={{ fontSize: '14px', color: '#666' }}>{t('trustScore.billsSection.address')}</p>
              <p style={{ fontSize: '16px', fontWeight: '500' }}>{ocrData.address}</p>
            </div>
            <div style={{ marginBottom: '24px' }}>
              <p style={{ fontSize: '14px', color: '#666' }}>{t('trustScore.billsSection.amount')}</p>
              <p style={{ fontSize: '16px', fontWeight: '500' }}>{ocrData.amount}</p>
            </div>
            <button className="btn-primary" onClick={confirmOCR}>
              {t('trustScore.billsSection.confirmContinue')}
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (isGenerating) {
    return (
      <div className="mobile-container">
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <h2 style={{ fontSize: '20px', fontWeight: '600', marginTop: '24px' }}>
            {t('trustScore.calculating')}
          </h2>
          <p style={{ color: '#666', marginTop: '8px' }}>
            {t('trustScore.building')}
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
        <h1 className="header-title">{t('trustScore.title')}</h1>
        <div style={{ width: '32px' }}></div>
      </div>

      <div className="content">
        <div style={{ marginBottom: '24px' }}>
          <p style={{ fontSize: '14px', color: '#666', marginBottom: '4px' }}>
            {t('common.step')} 3 {t('common.of')} 3 - Part 2
          </p>
          <div className="progress-bar">
            <div className="progress-fill" style={{ width: '100%' }}></div>
          </div>
        </div>

        <div style={{ marginBottom: '32px' }}>
          <h3 style={{
            fontSize: '18px',
            fontWeight: '600',
            marginBottom: '12px'
          }}>
            {t('trustScore.billsSection.heading')}
          </h3>
          <p style={{
            fontSize: '14px',
            color: '#666',
            marginBottom: '20px'
          }}>
            {t('trustScore.billsSection.description')}
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {billTypes.map((bill) => {
              const Icon = bill.icon;
              const isUploaded = bills[bill.id];
              
              return (
                <button
                  key={bill.id}
                  onClick={() => !isUploaded && handleUploadClick(bill.id)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '16px',
                    backgroundColor: isUploaded ? '#dcfce7' : '#f8fafc',
                    borderRadius: '8px',
                    border: `1px solid ${isUploaded ? '#10b981' : '#e5e7eb'}`,
                    cursor: isUploaded ? 'default' : 'pointer',
                    transition: 'all 0.3s ease'
                  }}
                >
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px'
                  }}>
                    <div style={{
                      width: '40px',
                      height: '40px',
                      backgroundColor: isUploaded ? '#10b981' : (bill.logo ? 'white' : bill.color),
                      borderRadius: '8px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      overflow: 'hidden',
                      border: bill.logo && !isUploaded ? '1px solid #e5e7eb' : 'none'
                    }}>
                      {isUploaded ? (
                        <Check size={20} color="white" />
                      ) : bill.logo ? (
                        <img 
                          src={bill.logo} 
                          alt={bill.name}
                          style={{
                            width: '100%',
                            height: '100%',
                            objectFit: 'contain',
                            padding: '4px'
                          }}
                        />
                      ) : (
                        <Icon size={20} color="white" />
                      )}
                    </div>
                    <span style={{ 
                      fontWeight: '500',
                      color: isUploaded ? '#10b981' : '#1a1a1a'
                    }}>
                      {isUploaded ? `${bill.name} ${t('trustScore.billsSection.uploaded')}` : `${t('common.upload')} ${bill.name}`}
                    </span>
                  </div>
                  
                  {!isUploaded && <Upload size={20} color="#64748b" />}
                </button>
              );
            })}
          </div>
        </div>

        <button
          className="btn-primary"
          onClick={handleGenerateTrustScore}
          disabled={!allBillsUploaded}
        >
          {t('trustScore.billsSection.generateScore')}
        </button>
      </div>
    </div>
  );
}

export default TrustScoreBills;