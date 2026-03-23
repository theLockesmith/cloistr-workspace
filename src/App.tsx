import { useState, useEffect, createContext, useContext } from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { generateSecretKey, getPublicKey, finalizeEvent, nip19 } from 'nostr-tools'
import type { SignerInterface } from '@cloistr/collab-common'
import type { Event, UnsignedEvent } from 'nostr-tools'
import { Layout } from './components/Layout'
import { ActivityView } from './views/ActivityView'
import { ProjectsView } from './views/ProjectsView'
import { SocialView } from './views/SocialView'
import { DocumentView } from './views/DocumentView'
import './App.css'

// Auth context providing signer and relay config
interface AuthContextType {
  signer: SignerInterface
  publicKey: string
  npub: string
  relayUrl: string
}

const AuthContext = createContext<AuthContextType | null>(null)

export function useNostrAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useNostrAuth must be used within AuthProvider')
  }
  return context
}

/**
 * Create a SignerInterface from a private key
 * In production, this would be replaced with NIP-46 or NIP-07 signer
 */
function createLocalSigner(privateKey: Uint8Array): SignerInterface {
  const pubkey = getPublicKey(privateKey)

  return {
    async getPublicKey(): Promise<string> {
      return pubkey
    },
    async signEvent(event: UnsignedEvent): Promise<Event> {
      return finalizeEvent(event, privateKey)
    },
    async encrypt(_pubkey: string, _plaintext: string): Promise<string> {
      throw new Error('Encryption not implemented for local signer')
    },
    async decrypt(_pubkey: string, _ciphertext: string): Promise<string> {
      throw new Error('Decryption not implemented for local signer')
    },
  }
}

function App() {
  const [authConfig, setAuthConfig] = useState<AuthContextType | null>(null)

  useEffect(() => {
    // Generate a session key for demo purposes
    // In production, this would connect to coldforge-signer via NIP-46
    const privateKey = generateSecretKey()
    const publicKey = getPublicKey(privateKey)
    const signer = createLocalSigner(privateKey)

    setAuthConfig({
      relayUrl: 'wss://nos.lol',
      signer,
      publicKey,
      npub: nip19.npubEncode(publicKey),
    })
  }, [])

  if (!authConfig) {
    return (
      <div className="loading">
        <div className="loading-spinner" />
        <p>Initializing Cloistr...</p>
      </div>
    )
  }

  return (
    <AuthContext.Provider value={authConfig}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Navigate to="/activity" replace />} />
            <Route path="activity" element={<ActivityView />} />
            <Route path="projects" element={<ProjectsView />} />
            <Route path="social" element={<SocialView />} />
            <Route path="doc/:type/:id" element={<DocumentView />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthContext.Provider>
  )
}

export default App
