// ============================================================
// Projects.jsx
//
// Reads the `projects` array from profile.js and renders one
// row per project. Because the content lives in profile.js,
// adding a 4th project later means adding one object to that
// array - this file never needs to change.
// ============================================================

export default function Projects({ projects }) {
  return (
    <section className="projects" id="projects">
      <h2>Projects</h2>
      <p className="section-hint">
        Live means the link actually works right now. In progress means the code exists but isn't deployed yet.
      </p>

      {projects.map((project) => (
        <div className="project-row" key={project.name}>
          <div>
            <b>{project.name}</b>
            <div className="project-stack">{project.stack.join(' · ')}</div>
          </div>
          <p>{project.description}</p>
          <div className="project-links">
            <span className={`status status-${project.status}`}>
              {project.status === 'live' ? 'Live' : 'In progress'}
            </span>
            {project.status === 'live' && project.liveUrl && (
              <a href={project.liveUrl} target="_blank" rel="noreferrer">
                Live demo
              </a>
            )}
            {project.githubUrl && (
              <a href={project.githubUrl} target="_blank" rel="noreferrer">
                GitHub
              </a>
            )}
          </div>
        </div>
      ))}
    </section>
  )
}
