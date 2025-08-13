import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'QR Generator',
  description: 'Modern QR code generator with clean minimalist design',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <style dangerouslySetInnerHTML={{
          __html: `
            * {
              margin: 0;
              padding: 0;
              box-sizing: border-box;
            }
            
            body {
              background: #f8fafc;
              min-height: 100vh;
            }
            
            @keyframes spin {
              0% { transform: rotate(0deg); }
              100% { transform: rotate(360deg); }
            }
            
            @keyframes float {
              0%, 100% { transform: translateY(0px); }
              50% { transform: translateY(-10px); }
            }
            
            @keyframes glow {
              0%, 100% { box-shadow: 0 0 20px rgba(102, 126, 234, 0.3); }
              50% { box-shadow: 0 0 30px rgba(102, 126, 234, 0.5); }
            }
            
            @keyframes slideInUp {
              from {
                opacity: 0;
                transform: translateY(30px);
              }
              to {
                opacity: 1;
                transform: translateY(0);
              }
            }
            
            .glass {
              background: #ffffff;
              border: 1px solid #e2e8f0;
              box-shadow: 0 4px 16px rgba(0, 0, 0, 0.08);
            }
            
            .glass-strong {
              background: #ffffff;
              border: 1px solid #e2e8f0;
              box-shadow: 0 8px 32px rgba(0, 0, 0, 0.12);
            }
            
            @media (max-width: 768px) {
              .responsive-grid {
                grid-template-columns: 1fr !important;
                gap: 2rem !important;
              }
              
              .responsive-title {
                font-size: 2.5rem !important;
              }
            }
          `
        }} />
      </head>
      <body style={{
        margin: 0,
        padding: 0,
        fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", sans-serif',
        WebkitFontSmoothing: 'antialiased',
        MozOsxFontSmoothing: 'grayscale'
      }}>
        {children}
      </body>
    </html>
  )
}