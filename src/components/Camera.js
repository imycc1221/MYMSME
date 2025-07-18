import React, { useRef, useCallback } from 'react';
import Webcam from 'react-webcam';
import { ChevronLeft, Camera as CameraIcon, Lightbulb } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

function Camera({ mode, onCapture, onBack }) {
  const webcamRef = useRef(null);
  const { t } = useLanguage();

  const capture = useCallback(() => {
    const imageSrc = webcamRef.current.getScreenshot();
    onCapture(imageSrc);
  }, [webcamRef, onCapture]);

  const isMyKad = mode === 'mykad';

  return (
    <div className="mobile-container" style={{ backgroundColor: '#000', height: '100vh' }}>
      <div className="header" style={{ 
        backgroundColor: 'rgba(0,0,0,0.5)', 
        borderBottom: 'none',
        position: 'fixed',
        top: 0,
        left: '50%',
        transform: 'translateX(-50%)',
        width: '100%',
        maxWidth: '390px',
        zIndex: 10
      }}>
        <button className="back-button" onClick={onBack} style={{ color: 'white' }}>
          <ChevronLeft />
        </button>
        <h1 className="header-title" style={{ color: 'white' }}>
          {isMyKad ? t('camera.frontOfIC') : t('camera.selfieVideo')}
        </h1>
        <button style={{ 
          background: 'none', 
          border: 'none', 
          color: 'white',
          display: 'flex',
          alignItems: 'center',
          gap: '4px',
          fontSize: '14px'
        }}>
          <Lightbulb size={20} />
          {t('common.tips')}
        </button>
      </div>

      <div style={{
        position: 'relative',
        width: '100%',
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        <Webcam
          audio={false}
          ref={webcamRef}
          screenshotFormat="image/jpeg"
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover'
          }}
        />

        {isMyKad ? (
          <>
            <div className="camera-overlay" style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <div style={{
                position: 'absolute',
                left: '20px',
                top: '50%',
                transform: 'translateY(-50%)',
                width: '40px',
                height: '40px',
                border: '2px solid white',
                borderRadius: '4px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <div style={{
                  width: '20px',
                  height: '14px',
                  backgroundColor: 'white',
                  borderRadius: '2px'
                }}></div>
              </div>
              <div style={{
                position: 'absolute',
                right: '20px',
                width: '80px',
                height: '100px',
                border: '2px solid white',
                borderRadius: '8px',
                opacity: 0.5
              }}></div>
            </div>
            <p style={{
              position: 'absolute',
              top: '120px',
              color: 'white',
              fontSize: '16px',
              textAlign: 'center',
              padding: '0 20px'
            }}>
              {t('camera.positionIC')}
            </p>
          </>
        ) : (
          <>
            <div className="selfie-overlay"></div>
            <p style={{
              position: 'absolute',
              top: '120px',
              color: 'white',
              fontSize: '16px',
              textAlign: 'center',
              padding: '0 20px'
            }}>
              {t('camera.positionFace')}
            </p>
            <div style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              width: '60px',
              height: '60px',
              backgroundColor: 'rgba(37, 99, 235, 0.8)',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <div style={{
                fontSize: '24px',
                color: 'white'
              }}>
                ☺
              </div>
              <p style={{
                position: 'absolute',
                bottom: '-30px',
                fontSize: '14px',
                color: 'white',
                whiteSpace: 'nowrap'
              }}>
                {t('camera.pleaseSmile')}
              </p>
            </div>
          </>
        )}

        <button
          onClick={capture}
          style={{
            position: 'absolute',
            bottom: '80px',
            width: '80px',
            height: '80px',
            borderRadius: '50%',
            backgroundColor: isMyKad ? 'white' : '#2563eb',
            border: 'none',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            boxShadow: '0 4px 20px rgba(0,0,0,0.3)'
          }}
        >
          {isMyKad ? (
            <CameraIcon size={32} color="#1a1a1a" />
          ) : (
            <span style={{ color: 'white', fontSize: '16px', fontWeight: '600' }}>
              {t('camera.start')}
            </span>
          )}
        </button>
      </div>
    </div>
  );
}

export default Camera;