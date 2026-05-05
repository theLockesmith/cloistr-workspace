import { NavLink, Outlet } from 'react-router-dom'
import { useNostrAuth } from '@cloistr/collab-common/auth'
import { Header } from '@cloistr/ui/components'

export function Layout() {
  const { authState } = useNostrAuth()
  const shortPubkey = authState.pubkey
    ? `${authState.pubkey.slice(0, 8)}...${authState.pubkey.slice(-4)}`
    : ''

  return (
    <div className="workspace">
      {/* Unified Header */}
      <Header activeServiceId="workspace" />

      <div className="workspace-body">
        {/* Sidebar */}
        <aside className="sidebar">
          <nav className="sidebar-nav">
            <NavLink to="/activity" className={({ isActive }) => isActive ? 'nav-item active' : 'nav-item'}>
              <span className="nav-icon">⚡</span>
              <span className="nav-label">Activity</span>
            </NavLink>

            <NavLink to="/projects" className={({ isActive }) => isActive ? 'nav-item active' : 'nav-item'}>
              <span className="nav-icon">📁</span>
              <span className="nav-label">Projects</span>
            </NavLink>

            <NavLink to="/social" className={({ isActive }) => isActive ? 'nav-item active' : 'nav-item'}>
              <span className="nav-icon">👥</span>
              <span className="nav-label">Social</span>
            </NavLink>
          </nav>

          <div className="sidebar-divider" />

          <div className="sidebar-section">
            <h3 className="sidebar-section-title">Create New</h3>
            <button className="create-btn">
              <span className="nav-icon">📄</span>
              <span>Document</span>
            </button>
            <button className="create-btn">
              <span className="nav-icon">📊</span>
              <span>Spreadsheet</span>
            </button>
            <button className="create-btn">
              <span className="nav-icon">🎨</span>
              <span>Whiteboard</span>
            </button>
            <button className="create-btn">
              <span className="nav-icon">📽️</span>
              <span>Presentation</span>
            </button>
          </div>

          <div className="sidebar-footer">
            <div className="user-info">
              <div className="user-avatar">
                {authState.pubkey?.slice(0, 2).toUpperCase() || '??'}
              </div>
              <div className="user-details">
                <span className="user-npub">{shortPubkey}</span>
                <span className="user-status">
                  {authState.method === 'nip07' ? 'Extension' : 'Bunker'}
                </span>
              </div>
            </div>
          </div>
        </aside>

        {/* Main content */}
        <main className="main-content">
          <Outlet />
        </main>
      </div>
    </div>
  )
}
