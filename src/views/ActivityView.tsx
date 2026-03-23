import { useState } from 'react'
import { Link } from 'react-router-dom'

interface RecentDocument {
  id: string
  type: 'doc' | 'sheet' | 'whiteboard' | 'slides'
  title: string
  lastModified: Date
  collaborators: number
}

// Demo data - in production this would come from relay
const DEMO_DOCUMENTS: RecentDocument[] = [
  { id: 'demo-document', type: 'doc', title: 'Project Proposal', lastModified: new Date(), collaborators: 3 },
  { id: 'demo-whiteboard', type: 'whiteboard', title: 'Architecture Diagram', lastModified: new Date(Date.now() - 3600000), collaborators: 2 },
  { id: 'demo-sheet', type: 'sheet', title: 'Budget 2026', lastModified: new Date(Date.now() - 7200000), collaborators: 1 },
  { id: 'demo-slides', type: 'slides', title: 'Quarterly Review', lastModified: new Date(Date.now() - 86400000), collaborators: 4 },
]

const TYPE_ICONS: Record<string, string> = {
  doc: '📄',
  sheet: '📊',
  whiteboard: '🎨',
  slides: '📽️',
}

function formatTime(date: Date): string {
  const diff = Date.now() - date.getTime()
  if (diff < 60000) return 'Just now'
  if (diff < 3600000) return `${Math.floor(diff / 60000)}m ago`
  if (diff < 86400000) return `${Math.floor(diff / 3600000)}h ago`
  return `${Math.floor(diff / 86400000)}d ago`
}

export function ActivityView() {
  const [documents] = useState<RecentDocument[]>(DEMO_DOCUMENTS)

  return (
    <div className="view activity-view">
      <header className="view-header">
        <h2>Activity</h2>
        <p className="view-subtitle">Your recent documents and updates</p>
      </header>

      <section className="activity-section">
        <h3>Recent Documents</h3>
        <div className="document-grid">
          {documents.map((doc) => (
            <Link
              key={doc.id}
              to={`/doc/${doc.type}/${doc.id}`}
              className="document-card"
            >
              <div className="document-icon">{TYPE_ICONS[doc.type]}</div>
              <div className="document-info">
                <h4 className="document-title">{doc.title}</h4>
                <div className="document-meta">
                  <span>{formatTime(doc.lastModified)}</span>
                  <span className="meta-separator">·</span>
                  <span>{doc.collaborators} collaborator{doc.collaborators !== 1 ? 's' : ''}</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section className="activity-section">
        <h3>Recent Activity</h3>
        <div className="activity-feed">
          <div className="activity-item">
            <span className="activity-icon">✏️</span>
            <div className="activity-content">
              <p><strong>You</strong> edited <strong>Project Proposal</strong></p>
              <span className="activity-time">Just now</span>
            </div>
          </div>
          <div className="activity-item">
            <span className="activity-icon">👤</span>
            <div className="activity-content">
              <p><strong>npub1abc...</strong> joined <strong>Architecture Diagram</strong></p>
              <span className="activity-time">1 hour ago</span>
            </div>
          </div>
          <div className="activity-item">
            <span className="activity-icon">💬</span>
            <div className="activity-content">
              <p><strong>npub1xyz...</strong> commented on <strong>Budget 2026</strong></p>
              <span className="activity-time">2 hours ago</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
