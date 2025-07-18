import React, { useRef } from 'react';
import { ChevronLeft, Upload } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

function FileUpload({ onFileSelect, onBack, accept, title }) {
  const fileInputRef = useRef(null);
  const { t } = useLanguage();

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      onFileSelect(file);
    }
  };

  return (
    <div className="mobile-container">
      <div className="header">
        <button className="back-button" onClick={onBack}>
          <ChevronLeft />
        </button>
        <h1 className="header-title">{title || t('fileUpload.title')}</h1>
        <div style={{ width: '32px' }}></div>
      </div>

      <div className="content" style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: 'calc(100vh - 60px)'
      }}>
        <input
          ref={fileInputRef}
          type="file"
          accept={accept}
          onChange={handleFileChange}
          style={{ display: 'none' }}
        />

        <div style={{
          width: '120px',
          height: '120px',
          backgroundColor: '#eff6ff',
          borderRadius: '50%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          marginBottom: '32px'
        }}>
          <Upload size={48} color="#2563eb" />
        </div>

        <h2 style={{
          fontSize: '20px',
          fontWeight: '600',
          marginBottom: '12px',
          textAlign: 'center'
        }}>
          {t('fileUpload.selectFile')}
        </h2>

        <p style={{
          fontSize: '14px',
          color: '#666',
          textAlign: 'center',
          marginBottom: '32px',
          padding: '0 40px'
        }}>
          {t('fileUpload.chooseFile')}
        </p>

        <button
          className="btn-primary"
          onClick={() => fileInputRef.current.click()}
          style={{ maxWidth: '200px' }}
        >
          {t('fileUpload.browseFiles')}
        </button>
      </div>
    </div>
  );
}

export default FileUpload;