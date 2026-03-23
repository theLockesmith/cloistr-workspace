import { useParams, Link } from 'react-router-dom'

const DOC_TYPE_INFO: Record<string, { name: string; icon: string; port: number }> = {
  doc: { name: 'Document', icon: '📄', port: 3001 },
  sheet: { name: 'Spreadsheet', icon: '📊', port: 3002 },
  whiteboard: { name: 'Whiteboard', icon: '🎨', port: 3003 },
  slides: { name: 'Presentation', icon: '📽️', port: 3004 },
}

export function DocumentView() {
  const { type, id } = useParams<{ type: string; id: string }>()

  const docInfo = type ? DOC_TYPE_INFO[type] : null

  if (!docInfo || !id) {
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

  // In production, this would embed the actual editor app
  // For now, show a placeholder with instructions
  return (
    <div className="view document-view">
      <header className="document-header">
        <Link to="/activity" className="back-link">
          ← Back
        </Link>
        <div className="document-title-area">
          <span className="document-type-icon">{docInfo.icon}</span>
          <h2>{docInfo.name}: {id}</h2>
        </div>
        <div className="document-actions">
          <button className="btn btn-secondary btn-sm">Share</button>
          <button className="btn btn-secondary btn-sm">Export</button>
        </div>
      </header>

      <div className="document-embed-placeholder">
        <div className="placeholder-content">
          <span className="placeholder-icon">{docInfo.icon}</span>
          <h3>Opening {docInfo.name}...</h3>
          <p>
            In the integrated workspace, this would embed the {docInfo.name.toLowerCase()} editor.
          </p>
          <p className="placeholder-hint">
            For now, run the editor app separately:
          </p>
          <code className="placeholder-command">
            cd ~/Development/cloistr-{type === 'doc' ? 'docs' : type}s && npm run dev
          </code>
          <p className="placeholder-note">
            Document ID: <strong>{id}</strong>
          </p>

          <div className="placeholder-features">
            <h4>What you'll get with the full integration:</h4>
            <ul>
              <li>Real-time collaborative editing</li>
              <li>Shared cursors and presence</li>
              <li>Automatic sync via Nostr relay</li>
              <li>End-to-end encryption (optional)</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}
