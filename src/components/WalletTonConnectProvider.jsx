'use client'
import { TonConnectUIProvider } from '@tonconnect/ui-react'

const manifestUrl = typeof window !== 'undefined'
  ? window.location.origin + '/tonconnect-manifest.json'
  : '/tonconnect-manifest.json'

export default function WalletTonConnectProvider({ children }) {
  return (
    <TonConnectUIProvider manifestUrl={manifestUrl} uiPreferences={{ language: 'ru', borderRadius: 'l', colorsSet: 'ton' }}>
      {children}
    </TonConnectUIProvider>
  )
} 