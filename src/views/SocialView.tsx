import { useState } from 'react'
import { useNostrAuth } from '../App'

interface Group {
  id: string
  name: string
  description: string
  memberCount: number
  isPrivate: boolean
}

interface Invitation {
  id: string
  from: string
  documentTitle: string
  documentType: string
  timestamp: Date
}

// Demo data - in production these would come from NIP-29 groups
const DEMO_GROUPS: Group[] = [
  { id: '1', name: 'Cloistr Development', description: 'Building the future of collaboration', memberCount: 12, isPrivate: false },
  { id: '2', name: 'Design Team', description: 'UI/UX discussions', memberCount: 5, isPrivate: true },
  { id: '3', name: 'Bitcoin Builders', description: 'Lightning integration planning', memberCount: 42, isPrivate: false },
]

const DEMO_INVITATIONS: Invitation[] = [
  { id: '1', from: 'npub1abc...', documentTitle: 'Roadmap Draft', documentType: 'doc', timestamp: new Date(Date.now() - 300000) },
  { id: '2', from: 'npub1xyz...', documentTitle: 'Design Mockups', documentType: 'whiteboard', timestamp: new Date(Date.now() - 3600000) },
]

export function SocialView() {
  const { npub } = useNostrAuth()
  const [groups] = useState<Group[]>(DEMO_GROUPS)
  const [invitations] = useState<Invitation[]>(DEMO_INVITATIONS)

  return (
    <div className="view social-view">
      <header className="view-header">
        <h2>Social</h2>
        <p className="view-subtitle">Groups, invitations, and collaboration</p>
      </header>

      {/* Pending Invitations */}
      {invitations.length > 0 && (
        <section className="social-section">
          <h3>Pending Invitations</h3>
          <div className="invitations-list">
            {invitations.map((invite) => (
              <div key={invite.id} className="invitation-card">
                <div className="invitation-info">
                  <p>
                    <strong>{invite.from}</strong> invited you to collaborate on
                    <strong> {invite.documentTitle}</strong>
                  </p>
                  <span className="invitation-time">
                    {Math.floor((Date.now() - invite.timestamp.getTime()) / 60000)} minutes ago
                  </span>
                </div>
                <div className="invitation-actions">
                  <button className="btn btn-primary btn-sm">Accept</button>
                  <button className="btn btn-secondary btn-sm">Decline</button>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Groups */}
      <section className="social-section">
        <div className="section-header">
          <h3>Your Groups</h3>
          <button className="btn btn-secondary btn-sm">+ Join Group</button>
        </div>
        <div className="groups-grid">
          {groups.map((group) => (
            <div key={group.id} className="group-card">
              <div className="group-header">
                <h4>{group.name}</h4>
                {group.isPrivate && <span className="private-badge">Private</span>}
              </div>
              <p className="group-description">{group.description}</p>
              <div className="group-footer">
                <span>{group.memberCount} members</span>
                <button className="btn btn-secondary btn-sm">Open</button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Your Identity */}
      <section className="social-section">
        <h3>Your Identity</h3>
        <div className="identity-card">
          <div className="identity-info">
            <div className="identity-avatar">
              {npub.slice(5, 7).toUpperCase()}
            </div>
            <div className="identity-details">
              <p className="identity-npub">{npub}</p>
              <p className="identity-note">Session key (not persisted)</p>
            </div>
          </div>
          <button className="btn btn-primary">
            Connect Signer (NIP-46)
          </button>
        </div>
      </section>
    </div>
  )
}
