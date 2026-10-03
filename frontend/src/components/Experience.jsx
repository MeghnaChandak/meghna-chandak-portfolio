// ============================================================
// Experience.jsx
//
// Same pattern as Projects.jsx: reads `experience` from
// profile.js and renders it. Nothing here needs editing when
// your job history changes - only profile.js does.
// ============================================================

export default function Experience({ experience }) {
  return (
    <section className="experience" id="experience">
      <h2>Experience</h2>

      {experience.map((job) => (
        <div className="experience-item" key={job.company}>
          <div className="experience-header">
            <b>{job.role}</b>
            <span>{job.dates}</span>
          </div>
          <div className="experience-company">{job.company}</div>
          <ul>
            {job.bullets.map((bullet, i) => (
              <li key={i}>{bullet}</li>
            ))}
          </ul>
        </div>
      ))}
    </section>
  )
}
