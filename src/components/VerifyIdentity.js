import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, Camera, User, Check } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import CameraComponent from './Camera';

function VerifyIdentity({ updateUserData, userData }) {
  const navigate = useNavigate();
  const { t } = useLanguage(); // Add this line
  const [myKadCaptured, setMyKadCaptured] = useState(false);
  const [selfieCaptured, setSelfieCaptured] = useState(false);
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [showCamera, setShowCamera] = useState(false);
  const [cameraMode, setCameraMode] = useState('');
  const [showSuccess, setShowSuccess] = useState(false);

  const handleCapture = (imageData) => {
    if (cameraMode === 'mykad') {
      updateUserData({ myKadPhoto: imageData });
      setMyKadCaptured(true);
    } else {
      updateUserData({ selfiePhoto: imageData });
      setSelfieCaptured(true);
    }
    setShowCamera(false);
  };

  const handleVerify = () => {
    if (myKadCaptured && selfieCaptured && termsAccepted) {
      setShowSuccess(true);
      // Extract name from MyKad (simulation)
      updateUserData({ name: 'Tan Hui Xin' });
      setTimeout(() => {
        navigate('/digital-shop');
      }, 2000);
    }
  };

  if (showCamera) {
    return (
      <CameraComponent 
        mode={cameraMode}
        onCapture={handleCapture}
        onBack={() => setShowCamera(false)}
      />
    );
  }

  if (showSuccess) {
    return (
      <div className="mobile-container">
        <div className="success-container">
          <div className="success-icon">
            <Check size={40} color="white" />
          </div>
          <h2 style={{ fontSize: '24px', fontWeight: '600', marginBottom: '12px' }}>
            {t('verifyIdentity.identityVerified')}
          </h2>
          <p style={{ color: '#666' }}>
            {t('verifyIdentity.redirecting')}
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
        <h1 className="header-title">{t('verifyIdentity.title')}</h1>
        <div style={{ width: '32px' }}></div>
      </div>

      <div className="content">
        <div style={{ marginBottom: '24px' }}>
          <p style={{ fontSize: '14px', color: '#666', marginBottom: '4px' }}>
            {t('common.step')} 1 {t('common.of')} 3
          </p>
          <div className="progress-bar">
            <div className="progress-fill" style={{ width: '33.33%' }}></div>
          </div>
        </div>

        <p style={{
          fontSize: '16px',
          color: '#666',
          marginBottom: '32px'
        }}>
          {t('verifyIdentity.myKadInstruction')}
        </p>

        <button
          className="icon-button"
          onClick={() => {
            setCameraMode('mykad');
            setShowCamera(true);
          }}
          style={{
            marginBottom: '24px',
            backgroundColor: myKadCaptured ? '#dcfce7' : '#f8fafc',
            borderColor: myKadCaptured ? '#10b981' : '#cbd5e1'
          }}
        >
          <Camera size={24} color={myKadCaptured ? '#10b981' : '#64748b'} />
          <span style={{ color: myKadCaptured ? '#10b981' : '#1a1a1a' }}>
            {myKadCaptured ? t('verifyIdentity.myKadCaptured') : t('verifyIdentity.captureMyKad')}
          </span>
        </button>

        <p style={{
          fontSize: '16px',
          color: '#666',
          marginBottom: '16px'
        }}>
          {t('verifyIdentity.selfieInstruction')}
        </p>

        <button
          className="icon-button"
          onClick={() => {
            setCameraMode('selfie');
            setShowCamera(true);
          }}
          style={{
            marginBottom: '32px',
            backgroundColor: selfieCaptured ? '#dcfce7' : '#f8fafc',
            borderColor: selfieCaptured ? '#10b981' : '#cbd5e1'
          }}
        >
          <User size={24} color={selfieCaptured ? '#10b981' : '#64748b'} />
          <span style={{ color: selfieCaptured ? '#10b981' : '#1a1a1a' }}>
            {selfieCaptured ? t('verifyIdentity.selfieCaptured') : t('verifyIdentity.takeSelfie')}
          </span>
        </button>

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
            {t('verifyIdentity.termsText')}
          </span>
        </label>

        <button
          className="btn-primary"
          onClick={handleVerify}
          disabled={!myKadCaptured || !selfieCaptured || !termsAccepted}
        >
          {t('verifyIdentity.verifyButton')}
        </button>
      </div>
    </div>
  );
}

export default VerifyIdentity;