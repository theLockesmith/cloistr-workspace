import { Routes, Route, Navigate } from 'react-router-dom'
import { useNostrAuth } from '@cloistr/collab-common/auth'
import { LoginPrompt } from '@cloistr/ui/components'
import { Layout } from './components/Layout'
import { ActivityView } from './views/ActivityView'
import { ProjectsView } from './views/ProjectsView'
import { SocialView } from './views/SocialView'
import { DocumentView } from './views/DocumentView'
import './App.css'

function App() {
  const { authState, signer } = useNostrAuth()

  // Show login prompt if not authenticated
  if (!authState.isConnected || !signer) {
    return (
      <div className="app-login">
        <LoginPrompt
          title="Cloistr Workspace"
          subtitle="Collaborative workspace powered by Nostr"
          callToAction="Sign in to access your workspace."
        />
      </div>
    )
  }

  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Navigate to="/activity" replace />} />
        <Route path="activity" element={<ActivityView />} />
        <Route path="projects" element={<ProjectsView />} />
        <Route path="social" element={<SocialView />} />
        <Route path="doc/:type/:id" element={<DocumentView />} />
      </Route>
    </Routes>
  )
}

export default App
