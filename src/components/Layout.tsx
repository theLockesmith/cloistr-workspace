import { NavLink, Outlet } from 'react-router-dom'
import { useNostrAuth } from '../App'

export function Layout() {
  const { npub } = useNostrAuth()

  return (
    <div className="workspace">
      {/* Sidebar */}
      <aside className="sidebar">
        <div className="sidebar-header">
          <h1 className="logo">Cloistr</h1>
        </div>

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
              {npub.slice(5, 7).toUpperCase()}
            </div>
            <div className="user-details">
              <span className="user-npub">{npub.slice(0, 16)}...</span>
              <span className="user-status">Session key</span>
            </div>
          </div>
        </div>
      </aside>

      {/* Main content */}
      <main className="main-content">
        <Outlet />
      </main>
    </div>
  )
}
