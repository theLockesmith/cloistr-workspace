import { useState } from 'react'
import { Link } from 'react-router-dom'

interface Project {
  id: string
  name: string
  description: string
  documentCount: number
  collaborators: number
  color: string
}

// Demo data
const DEMO_PROJECTS: Project[] = [
  { id: '1', name: 'Personal', description: 'My private documents', documentCount: 5, collaborators: 1, color: '#3b82f6' },
  { id: '2', name: 'Work', description: 'Professional projects', documentCount: 12, collaborators: 4, color: '#10b981' },
  { id: '3', name: 'Research', description: 'Notes and findings', documentCount: 8, collaborators: 2, color: '#f59e0b' },
]

export function ProjectsView() {
  const [projects] = useState<Project[]>(DEMO_PROJECTS)

  return (
    <div className="view projects-view">
      <header className="view-header">
        <h2>Projects</h2>
        <p className="view-subtitle">Organize your work into projects</p>
        <button className="btn btn-primary">
          + New Project
        </button>
      </header>

      <div className="projects-grid">
        {projects.map((project) => (
          <div key={project.id} className="project-card">
            <div className="project-header" style={{ backgroundColor: project.color }}>
              <h3>{project.name}</h3>
            </div>
            <div className="project-body">
              <p className="project-description">{project.description}</p>
              <div className="project-stats">
                <span>{project.documentCount} documents</span>
                <span className="meta-separator">·</span>
                <span>{project.collaborators} collaborator{project.collaborators !== 1 ? 's' : ''}</span>
              </div>
            </div>
            <div className="project-footer">
              <Link to={`/doc/doc/demo-document`} className="btn btn-secondary btn-sm">
                Open
              </Link>
            </div>
          </div>
        ))}

        {/* Add Project Card */}
        <div className="project-card add-project">
          <div className="add-project-content">
            <span className="add-icon">+</span>
            <span>Create New Project</span>
          </div>
        </div>
      </div>
    </div>
  )
}
