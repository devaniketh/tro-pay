import './globals.css'
import WalletConnectionProvider from '@/components/WalletProvider'

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <WalletConnectionProvider>
          <main className="max-w-xl mx-auto p-6">
            {children}
          </main>
        </WalletConnectionProvider>
      </body>
    </html>
  )
}