import { useParams, Link } from 'react-router-dom'
import { useState, useEffect } from 'react'

interface DocTypeConfig {
  name: string
  icon: string
  devPort: number
  prodUrl: string
}

const DOC_TYPE_CONFIG: Record<string, DocTypeConfig> = {
  doc: { name: 'Document', icon: '📄', devPort: 3001, prodUrl: '/docs' },
  sheet: { name: 'Spreadsheet', icon: '📊', devPort: 3002, prodUrl: '/sheets' },
  whiteboard: { name: 'Whiteboard', icon: '🎨', devPort: 3003, prodUrl: '/whiteboard' },
  slides: { name: 'Presentation', icon: '📽️', devPort: 3004, prodUrl: '/slides' },
}

export function DocumentView() {
  const { type, id } = useParams<{ type: string; id: string }>()
  const [editorStatus, setEditorStatus] = useState<'loading' | 'ready' | 'unavailable'>('loading')
  const [editorUrl, setEditorUrl] = useState<string | null>(null)

  const docConfig = type ? DOC_TYPE_CONFIG[type] : null

  useEffect(() => {
    if (!docConfig || !id) return

    // In development, editors run on separate ports
    // In production, they'd be at subpaths or subdomains
    const isDev = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1'

    if (isDev) {
      // Check if dev server is running
      const devUrl = `http://localhost:${docConfig.devPort}`

      // Try to connect to the dev server
      fetch(devUrl, { mode: 'no-cors' })
        .then(() => {
          // Pass document ID via URL parameter
          setEditorUrl(`${devUrl}?docId=${encodeURIComponent(id)}`)
          setEditorStatus('ready')
        })
        .catch(() => {
          setEditorStatus('unavailable')
        })
    } else {
      // Production: editors are at subpaths
      setEditorUrl(`${docConfig.prodUrl}?docId=${encodeURIComponent(id)}`)
      setEditorStatus('ready')
    }
  }, [docConfig, id])

  if (!docConfig || !id) {
    return (
      <div className="view document-view">
        <div className="document-error">
          <h2>Document Not Found</h2>
          <p>The document you're looking for doesn't exist.</p>
          <Link to="/activity" className="btn btn-primary">
            Back to Activity
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="view document-view">
      <header className="document-header">
        <Link to="/activity" className="back-link">
          ← Back
        </Link>
        <div className="document-title-area">
          <span className="document-type-icon">{docConfig.icon}</span>
          <h2>{docConfig.name}: {id}</h2>
        </div>
        <div className="document-actions">
          <button className="btn btn-secondary btn-sm" onClick={() => {
            navigator.clipboard.writeText(window.location.href)
          }}>
            Copy Link
          </button>
          <button className="btn btn-secondary btn-sm" onClick={() => {
            // Open in new tab for full-screen editing
            if (editorUrl) window.open(editorUrl, '_blank')
          }}>
            Open Full Screen
          </button>
        </div>
      </header>

      <div className="document-embed">
        {editorStatus === 'loading' && (
          <div className="embed-loading">
            <div className="loading-spinner" />
            <p>Connecting to {docConfig.name.toLowerCase()} editor...</p>
          </div>
        )}

        {editorStatus === 'unavailable' && (
          <div className="embed-unavailable">
            <span className="unavailable-icon">{docConfig.icon}</span>
            <h3>{docConfig.name} Editor Not Running</h3>
            <p>Start the editor to collaborate on this document:</p>
            <code className="start-command">
              cd ~/Development/cloistr-{type === 'doc' ? 'docs' : type + 's'} && npm run dev -- --port {docConfig.devPort}
            </code>
            <button
              className="btn btn-primary"
              onClick={() => {
                setEditorStatus('loading')
                // Retry connection
                const devUrl = `http://localhost:${docConfig.devPort}`
                fetch(devUrl, { mode: 'no-cors' })
                  .then(() => {
                    setEditorUrl(`${devUrl}?docId=${encodeURIComponent(id)}`)
                    setEditorStatus('ready')
                  })
                  .catch(() => setEditorStatus('unavailable'))
              }}
            >
              Retry Connection
            </button>
          </div>
        )}

        {editorStatus === 'ready' && editorUrl && (
          <iframe
            src={editorUrl}
            className="editor-iframe"
            title={`${docConfig.name} Editor`}
            allow="clipboard-write"
          />
        )}
      </div>
    </div>
  )
}
