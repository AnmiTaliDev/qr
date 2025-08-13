'use client'

import { useState, useEffect } from 'react'
import QRCode from 'qrcode'

interface QRGeneratorProps {
  text: string
}

interface QRStyle {
  name: string
  dark: string
  light: string
  gradient?: boolean
  icon?: string
}

const qrStyles: QRStyle[] = [
  { name: 'Classic', dark: '#000000', light: '#ffffff', icon: '⚫' },
  { name: 'Ocean', dark: '#0077be', light: '#e6f3ff', icon: '🌊' },
  { name: 'Forest', dark: '#2d5a27', light: '#f0f8ff', icon: '🌲' },
  { name: 'Sunset', dark: '#ff6b35', light: '#fff5f0', icon: '🌅' },
  { name: 'Purple', dark: '#6366f1', light: '#f0f0ff', icon: '🟣' },
  { name: 'Pink', dark: '#ec4899', light: '#fdf2f8', icon: '🌸' },
  { name: 'Dark Mode', dark: '#ffffff', light: '#1a1a1a', icon: '🌙' },
  { name: 'Gold', dark: '#d4af37', light: '#fffbf0', icon: '✨' }
]

export default function QRGenerator({ text }: QRGeneratorProps) {
  const [qrDataURL, setQRDataURL] = useState<string>('')
  const [isLoading, setIsLoading] = useState(false)
  const [selectedStyle, setSelectedStyle] = useState<QRStyle>(qrStyles[0])
  const [qrSize, setQrSize] = useState(256)
  const [errorLevel, setErrorLevel] = useState<'L' | 'M' | 'Q' | 'H'>('M')

  useEffect(() => {
    if (!text.trim()) {
      setQRDataURL('')
      return
    }

    setIsLoading(true)
    
    QRCode.toDataURL(text, {
      width: qrSize,
      margin: 2,
      errorCorrectionLevel: errorLevel,
      color: {
        dark: selectedStyle.dark,
        light: selectedStyle.light
      }
    })
    .then(url => {
      setQRDataURL(url)
      setIsLoading(false)
    })
    .catch(err => {
      console.error(err)
      setIsLoading(false)
    })
  }, [text])

  if (!text.trim()) {
    return (
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '2rem',
        width: '100%'
      }}>
        {/* QR Style Selector */}
        <div className="glass" style={{
          padding: '1.5rem',
          borderRadius: '20px'
        }}>
          <h3 style={{
            fontSize: '1.1rem',
            fontWeight: 600,
            marginBottom: '1rem',
            color: '#1a202c'
          }}>
            QR Style
          </h3>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(80px, 1fr))',
            gap: '0.5rem'
          }}>
            {qrStyles.map((style, index) => (
              <button
                key={index}
                onClick={() => setSelectedStyle(style)}
                style={{
                  padding: '0.8rem 0.5rem',
                  borderRadius: '12px',
                  border: selectedStyle.name === style.name ? '2px solid #3b82f6' : '1px solid #e2e8f0',
                  background: selectedStyle.name === style.name ? '#f0f9ff' : '#ffffff',
                  color: '#1a202c',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                  fontSize: '0.8rem',
                  fontWeight: 500,
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: '0.3rem',
                  boxShadow: '0 2px 4px rgba(0, 0, 0, 0.05)'
                }}
                onMouseOver={(e) => {
                  if (selectedStyle.name !== style.name) {
                    e.target.style.background = '#f8fafc'
                    e.target.style.transform = 'translateY(-1px)'
                  }
                }}
                onMouseOut={(e) => {
                  e.target.style.background = selectedStyle.name === style.name ? '#f0f9ff' : '#ffffff'
                  e.target.style.transform = 'translateY(0)'
                }}
              >
                <span style={{ fontSize: '1.5rem' }}>{style.icon}</span>
                {style.name}
              </button>
            ))}
          </div>
        </div>

        {/* Settings */}
        <div className="glass" style={{
          padding: '1.5rem',
          borderRadius: '20px'
        }}>
          <h3 style={{
            fontSize: '1.1rem',
            fontWeight: 600,
            marginBottom: '1rem',
            color: '#1a202c'
          }}>
            Settings
          </h3>
          <div style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '1rem'
          }}>
            <div>
              <label style={{
                display: 'block',
                fontSize: '0.9rem',
                fontWeight: 500,
                marginBottom: '0.5rem',
                color: '#374151'
              }}>
                Size: {qrSize}px
              </label>
              <input
                type="range"
                min="128"
                max="512"
                value={qrSize}
                onChange={(e) => setQrSize(Number(e.target.value))}
                style={{
                  width: '100%',
                  height: '6px',
                  borderRadius: '3px',
                  background: '#e2e8f0',
                  outline: 'none',
                  cursor: 'pointer'
                }}
              />
            </div>
            <div>
              <label style={{
                display: 'block',
                fontSize: '0.9rem',
                fontWeight: 500,
                marginBottom: '0.5rem',
                color: '#374151'
              }}>
                Error Correction
              </label>
              <select
                value={errorLevel}
                onChange={(e) => setErrorLevel(e.target.value as 'L' | 'M' | 'Q' | 'H')}
                style={{
                  width: '100%',
                  padding: '0.5rem',
                  borderRadius: '8px',
                  border: '1px solid #e2e8f0',
                  background: '#ffffff',
                  color: '#1a202c',
                  fontSize: '0.9rem',
                  outline: 'none'
                }}
              >
                <option value="L">Low (7%)</option>
                <option value="M">Medium (15%)</option>
                <option value="Q">Quartile (25%)</option>
                <option value="H">High (30%)</option>
              </select>
            </div>
          </div>
        </div>

        {/* Placeholder */}
        <div className="glass" style={{
          padding: '3rem',
          borderRadius: '20px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: '300px'
        }}>
          <div style={{
            textAlign: 'center',
            color: '#64748b'
          }}>
            <div style={{
              fontSize: '4rem',
              marginBottom: '1rem',
              opacity: 0.6
            }}>
              📱
            </div>
            <p style={{
              fontSize: '1.1rem',
              fontWeight: 500,
              marginBottom: '0.5rem',
              color: '#1a202c'
            }}>
              Enter text to generate QR code
            </p>
            <p style={{
              fontSize: '0.9rem',
              color: '#64748b'
            }}>
              Your QR code will appear here with the selected style
            </p>
          </div>
        </div>
      </div>
    )
  }

  if (isLoading) {
    return (
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '2rem',
        width: '100%'
      }}>
        {/* Style selector (same as above but disabled) */}
        <div className="glass" style={{
          padding: '1.5rem',
          borderRadius: '20px',
          opacity: 0.6,
          pointerEvents: 'none'
        }}>
          <h3 style={{
            fontSize: '1.1rem',
            fontWeight: 600,
            marginBottom: '1rem',
            color: '#1a202c'
          }}>
            QR Style
          </h3>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(80px, 1fr))',
            gap: '0.5rem'
          }}>
            {qrStyles.map((style, index) => (
              <div
                key={index}
                style={{
                  padding: '0.8rem 0.5rem',
                  borderRadius: '12px',
                  border: selectedStyle.name === style.name ? '2px solid #3b82f6' : '1px solid #e2e8f0',
                  background: selectedStyle.name === style.name ? '#f0f9ff' : '#ffffff',
                  color: '#1a202c',
                  fontSize: '0.8rem',
                  fontWeight: 500,
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: '0.3rem',
                  boxShadow: '0 2px 4px rgba(0, 0, 0, 0.05)'
                }}
              >
                <span style={{ fontSize: '1.5rem' }}>{style.icon}</span>
                {style.name}
              </div>
            ))}
          </div>
        </div>

        {/* Loading QR */}
        <div className="glass" style={{
          padding: '3rem',
          borderRadius: '20px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: '300px'
        }}>
          <div style={{
            textAlign: 'center',
            color: '#64748b'
          }}>
            <div style={{
              width: '50px',
              height: '50px',
              border: '4px solid #e2e8f0',
              borderTop: '4px solid #3b82f6',
              borderRadius: '50%',
              animation: 'spin 1s linear infinite',
              marginBottom: '1.5rem',
              marginLeft: 'auto',
              marginRight: 'auto'
            }}></div>
            <p style={{
              fontSize: '1.1rem',
              fontWeight: 500,
              color: '#1a202c',
              marginBottom: '0.5rem'
            }}>
              Generating QR code...
            </p>
            <p style={{
              fontSize: '0.9rem',
              color: '#64748b'
            }}>
              Creating your {selectedStyle.name.toLowerCase()} style QR code
            </p>
          </div>
        </div>
      </div>
    )
  }

  const downloadQR = () => {
    const link = document.createElement('a')
    link.href = qrDataURL
    link.download = 'qr-code.png'
    link.click()
  }

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      gap: '2rem',
      width: '100%'
    }}>
      {/* Active Style Selector */}
      <div className="glass" style={{
        padding: '1.5rem',
        borderRadius: '20px'
      }}>
        <h3 style={{
          fontSize: '1.1rem',
          fontWeight: 600,
          marginBottom: '1rem',
          color: '#1a202c'
        }}>
          QR Style
        </h3>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(80px, 1fr))',
          gap: '0.5rem'
        }}>
          {qrStyles.map((style, index) => (
            <button
              key={index}
              onClick={() => setSelectedStyle(style)}
              style={{
                padding: '0.8rem 0.5rem',
                borderRadius: '12px',
                border: selectedStyle.name === style.name ? '2px solid #3b82f6' : '1px solid #e2e8f0',
                background: selectedStyle.name === style.name ? '#f0f9ff' : '#ffffff',
                color: '#1a202c',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                fontSize: '0.8rem',
                fontWeight: 500,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '0.3rem',
                boxShadow: '0 2px 4px rgba(0, 0, 0, 0.05)'
              }}
              onMouseOver={(e) => {
                if (selectedStyle.name !== style.name) {
                  e.target.style.background = '#f8fafc'
                  e.target.style.transform = 'translateY(-1px)'
                }
              }}
              onMouseOut={(e) => {
                e.target.style.background = selectedStyle.name === style.name ? '#f0f9ff' : '#ffffff'
                e.target.style.transform = 'translateY(0)'
              }}
            >
              <span style={{ fontSize: '1.5rem' }}>{style.icon}</span>
              {style.name}
            </button>
          ))}
        </div>
      </div>

      {/* Settings */}
      <div className="glass" style={{
        padding: '1.5rem',
        borderRadius: '20px'
      }}>
        <h3 style={{
          fontSize: '1.1rem',
          fontWeight: 600,
          marginBottom: '1rem',
          color: '#1a202c'
        }}>
          Settings
        </h3>
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '1rem'
        }}>
          <div>
            <label style={{
              display: 'block',
              fontSize: '0.9rem',
              fontWeight: 500,
              marginBottom: '0.5rem',
              color: '#374151'
            }}>
              Size: {qrSize}px
            </label>
            <input
              type="range"
              min="128"
              max="512"
              value={qrSize}
              onChange={(e) => setQrSize(Number(e.target.value))}
              style={{
                width: '100%',
                height: '6px',
                borderRadius: '3px',
                background: '#e2e8f0',
                outline: 'none',
                cursor: 'pointer'
              }}
            />
          </div>
          <div>
            <label style={{
              display: 'block',
              fontSize: '0.9rem',
              fontWeight: 500,
              marginBottom: '0.5rem',
              color: '#374151'
            }}>
              Error Correction
            </label>
            <select
              value={errorLevel}
              onChange={(e) => setErrorLevel(e.target.value as 'L' | 'M' | 'Q' | 'H')}
              style={{
                width: '100%',
                padding: '0.5rem',
                borderRadius: '8px',
                border: '1px solid #e2e8f0',
                background: '#ffffff',
                color: '#1a202c',
                fontSize: '0.9rem',
                outline: 'none'
              }}
            >
              <option value="L">Low (7%)</option>
              <option value="M">Medium (15%)</option>
              <option value="Q">Quartile (25%)</option>
              <option value="H">High (30%)</option>
            </select>
          </div>
        </div>
      </div>

      {/* QR Code Result */}
      <div className="glass-strong" style={{
        padding: '2rem',
        borderRadius: '20px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '1.5rem',
        animation: 'slideInUp 0.5s ease-out'
      }}>
        <div style={{
          padding: '1rem',
          background: selectedStyle.light,
          borderRadius: '16px',
          boxShadow: '0 8px 25px rgba(0, 0, 0, 0.15)'
        }}>
          <img 
            src={qrDataURL} 
            alt="QR Code" 
            style={{
              borderRadius: '8px',
              display: 'block'
            }}
          />
        </div>
        
        <div style={{
          textAlign: 'center',
          marginBottom: '0.5rem'
        }}>
          <p style={{
            fontSize: '1rem',
            fontWeight: 600,
            color: '#1a202c',
            marginBottom: '0.3rem'
          }}>
            {selectedStyle.name} Style QR Code
          </p>
          <p style={{
            fontSize: '0.85rem',
            color: '#64748b'
          }}>
            {qrSize}×{qrSize}px • {errorLevel} Error Correction
          </p>
        </div>

        <div style={{
          display: 'flex',
          gap: '0.75rem',
          flexWrap: 'wrap',
          justifyContent: 'center'
        }}>
          <button 
            onClick={downloadQR} 
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.5rem',
              padding: '0.75rem 1.25rem',
              background: '#3b82f6',
              color: 'white',
              border: 'none',
              borderRadius: '12px',
              fontWeight: 600,
              fontSize: '0.9rem',
              cursor: 'pointer',
              transition: 'all 0.2s ease',
              boxShadow: '0 4px 12px rgba(59, 130, 246, 0.25)',
              fontFamily: 'inherit'
            }}
            onMouseOver={(e) => {
              e.target.style.background = '#2563eb'
              e.target.style.transform = 'translateY(-2px)'
              e.target.style.boxShadow = '0 6px 20px rgba(59, 130, 246, 0.4)'
            }}
            onMouseOut={(e) => {
              e.target.style.background = '#3b82f6'
              e.target.style.transform = 'translateY(0)'
              e.target.style.boxShadow = '0 4px 12px rgba(59, 130, 246, 0.25)'
            }}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
              <polyline points="7,10 12,15 17,10"/>
              <line x1="12" y1="15" x2="12" y2="3"/>
            </svg>
            Download PNG
          </button>
          
          <button 
            onClick={() => {
              setQRDataURL('')
              setSelectedStyle(qrStyles[0])
              setQrSize(256)
              setErrorLevel('M')
            }}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.5rem',
              padding: '0.75rem 1.25rem',
              background: '#f8fafc',
              color: '#475569',
              border: '1px solid #e2e8f0',
              borderRadius: '12px',
              fontWeight: 600,
              fontSize: '0.9rem',
              cursor: 'pointer',
              transition: 'all 0.2s ease',
              fontFamily: 'inherit'
            }}
            onMouseOver={(e) => {
              e.target.style.background = '#f1f5f9'
              e.target.style.transform = 'translateY(-1px)'
            }}
            onMouseOut={(e) => {
              e.target.style.background = '#f8fafc'
              e.target.style.transform = 'translateY(0)'
            }}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/>
              <path d="M3 3v5h5"/>
            </svg>
            New QR
          </button>
        </div>
      </div>
    </div>
  )
}