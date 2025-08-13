'use client'

import { useState } from 'react'
import QRGenerator from '@/components/QRGenerator'

export default function Home() {
  const [inputText, setInputText] = useState('')

  return (
    <main style={{
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      maxWidth: '1200px',
      margin: '0 auto',
      padding: '2rem 1rem',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", sans-serif',
      color: '#1a202c',
      lineHeight: '1.6',
      position: 'relative'
    }}>

      <div style={{
        textAlign: 'center',
        marginBottom: '4rem',
        zIndex: 2,
        position: 'relative',
        animation: 'slideInUp 0.8s ease-out'
      }}>
        <h1 className="responsive-title" style={{
          fontSize: '3.5rem',
          fontWeight: 700,
          marginBottom: '1rem',
          color: '#1a202c',
          letterSpacing: '-0.02em'
        }}>
          QR Generator
        </h1>
        <p style={{
          fontSize: '1.2rem',
          color: '#64748b',
          fontWeight: 400,
          maxWidth: '600px',
          margin: '0 auto',
          lineHeight: '1.6'
        }}>
          Create beautiful QR codes instantly with customizable styles and options
        </p>
        <div style={{
          marginTop: '1.5rem',
          display: 'inline-flex',
          alignItems: 'center',
          gap: '0.5rem',
          padding: '0.5rem 1rem',
          background: '#f1f5f9',
          borderRadius: '50px',
          border: '1px solid #e2e8f0'
        }}>
          <div style={{
            width: '8px',
            height: '8px',
            borderRadius: '50%',
            background: '#10b981'
          }}></div>
          <span style={{
            fontSize: '0.9rem',
            color: '#475569',
            fontWeight: 500
          }}>
            Free & Open Source
          </span>
        </div>
      </div>

      <div className="responsive-grid" style={{
        flex: 1,
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: '3rem',
        alignItems: 'start',
        maxWidth: '900px',
        margin: '0 auto',
        width: '100%'
      }}>
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '1rem'
        }}>
          <label htmlFor="text-input" style={{
            fontWeight: 600,
            color: '#374151',
            fontSize: '1rem',
            marginBottom: '0.5rem',
            display: 'block'
          }}>
            Enter text or URL
          </label>
          <textarea
            id="text-input"
            placeholder="Enter any text, URL, or data to generate a QR code..."
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            rows={4}
            className="glass"
            style={{
              padding: '1rem',
              borderRadius: '12px',
              fontSize: '1rem',
              fontFamily: 'inherit',
              resize: 'vertical',
              minHeight: '120px',
              transition: 'all 0.2s ease',
              outline: 'none',
              width: '100%'
            }}
            onFocus={(e) => {
              e.target.style.borderColor = '#3b82f6'
              e.target.style.boxShadow = '0 0 0 3px rgba(59, 130, 246, 0.1)'
            }}
            onBlur={(e) => {
              e.target.style.borderColor = '#e2e8f0'
              e.target.style.boxShadow = '0 4px 16px rgba(0, 0, 0, 0.08)'
            }}
          />
          {inputText && (
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center'
            }}>
              <span style={{
                fontSize: '0.875rem',
                color: '#6b7280'
              }}>
                {inputText.length} characters
              </span>
            </div>
          )}
        </div>

        <div style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'flex-start'
        }}>
          <QRGenerator text={inputText} />
        </div>
      </div>

      <footer style={{
        marginTop: 'auto',
        paddingTop: '3rem',
        textAlign: 'center'
      }}>
        <div className="glass" style={{
          padding: '1.5rem',
          borderRadius: '16px',
          display: 'inline-block'
        }}>
          <p style={{ 
            marginBottom: '0.5rem',
            color: '#64748b',
            fontSize: '0.9rem'
          }}>
            Open source QR generator • Licensed under{' '}
            <a 
              href="https://www.gnu.org/licenses/agpl-3.0.html" 
              target="_blank" 
              rel="noopener noreferrer"
              style={{
                color: '#3b82f6',
                textDecoration: 'none',
                fontWeight: 600
              }}
              onMouseOver={(e) => e.currentTarget.style.color = '#2563eb'}
              onMouseOut={(e) => e.currentTarget.style.color = '#3b82f6'}
            >
              AGPL 3.0
            </a>
          </p>
          <p>
            <a 
              href="https://github.com/AnmiTaliDev/qr" 
              target="_blank" 
              rel="noopener noreferrer"
              style={{
                color: '#3b82f6',
                textDecoration: 'none',
                fontWeight: 600,
                fontSize: '0.9rem',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.5rem'
              }}
              onMouseOver={(e) => e.currentTarget.style.color = '#2563eb'}
              onMouseOut={(e) => e.currentTarget.style.color = '#3b82f6'}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"/>
              </svg>
              View on GitHub
            </a>
          </p>
        </div>
      </footer>
    </main>
  )
}