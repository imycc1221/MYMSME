import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, Upload, MapPin } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import FileUpload from './FileUpload';

function DigitalShop({ updateUserData, userData }) {
  const navigate = useNavigate();
  const { t } = useLanguage(); // Add this line
  const [shopName, setShopName] = useState('');
  const [shopPhoto, setShopPhoto] = useState(null);
  const [location, setLocation] = useState('');
  const [showFileUpload, setShowFileUpload] = useState(false);

  const handlePhotoUpload = (file) => {
    setShopPhoto(file);
    setShowFileUpload(false);
  };

  const handleLocationPin = () => {
    // Simulate location selection
    setLocation('Asia Pacific University, Kuala Lumpur');
  };

  const handleSave = () => {
    updateUserData({
      shopName,
      shopPhoto,
      location
    });
    navigate('/trust-score-wallets');
  };

  if (showFileUpload) {
    return (
      <FileUpload
        onFileSelect={handlePhotoUpload}
        onBack={() => setShowFileUpload(false)}
        accept="image/*"
        title={t('digitalShop.uploadPhoto')}
      />
    );
  }

  return (
    <div className="mobile-container">
      <div className="header">
        <button className="back-button" onClick={() => navigate(-1)}>
          <ChevronLeft />
        </button>
        <h1 className="header-title">{t('digitalShop.title')}</h1>
        <div style={{ width: '32px' }}></div>
      </div>

      <div className="content">
        <div style={{ marginBottom: '24px' }}>
          <p style={{ fontSize: '14px', color: '#666', marginBottom: '4px' }}>
            {t('common.step')} 2 {t('common.of')} 3
          </p>
          <div className="progress-bar">
            <div className="progress-fill" style={{ width: '66.66%' }}></div>
          </div>
        </div>

        <div className="form-group">
          <label className="form-label">{t('digitalShop.shopNameLabel')}</label>
          <input
            type="text"
            className="form-input"
            placeholder={t('digitalShop.shopNamePlaceholder')}
            value={shopName}
            onChange={(e) => setShopName(e.target.value)}
          />
        </div>

        <button
          className="icon-button"
          onClick={() => setShowFileUpload(true)}
          style={{
            marginBottom: '24px',
            backgroundColor: shopPhoto ? '#dcfce7' : '#f8fafc',
            borderColor: shopPhoto ? '#10b981' : '#cbd5e1'
          }}
        >
          <Upload size={24} color={shopPhoto ? '#10b981' : '#64748b'} />
          <span style={{ color: shopPhoto ? '#10b981' : '#1a1a1a' }}>
            {shopPhoto ? t('digitalShop.photoUploaded') : t('digitalShop.uploadPhoto')}
          </span>
        </button>

        <button
          className="icon-button"
          onClick={handleLocationPin}
          style={{
            marginBottom: '32px',
            backgroundColor: location ? '#dcfce7' : '#f8fafc',
            borderColor: location ? '#10b981' : '#cbd5e1'
          }}
        >
          <MapPin size={24} color={location ? '#10b981' : '#64748b'} />
          <span style={{ color: location ? '#10b981' : '#1a1a1a' }}>
            {location || t('digitalShop.pinLocation')}
          </span>
        </button>

        <button
          className="btn-primary"
          onClick={handleSave}
          disabled={!shopName || !shopPhoto || !location}
        >
          {t('digitalShop.saveProfile')}
        </button>
      </div>
    </div>
  );
}

export default DigitalShop;