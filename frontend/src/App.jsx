import { useState } from 'react'
import { profile } from './data/profile.js'
import Backdrop from './components/Backdrop.jsx'
import Gate from './components/Gate.jsx'
import Chat from './components/Chat.jsx'
import Experience from './components/Experience.jsx'
import Projects from './components/Projects.jsx'
import Skills from './components/Skills.jsx'
import CatGame from './components/CatGame.jsx'
import Marquee from './components/Marquee.jsx'
import StatRow from './components/StatRow.jsx'
import Interests from './components/Interests.jsx'
import ScrollProgress from './components/ScrollProgress.jsx'

// ============================================================
// App.jsx
//
// One <main> for the whole site (a page should only have one
// "main" landmark - screen readers rely on that). The marquee
// needs to run edge-to-edge, full viewport width, while everything
// else stays in a centered, readable column - so content is split
// into ".site-inner" wrappers (the readable column) with the
// full-bleed <Marquee /> sitting between them, all still inside
// the single <main>. See .site-inner's "full-bleed" trick in
// index.css for how a child breaks out of a centered parent's
// max-width without needing a second layout container.
// ============================================================

export default function App() {
  const [hasEntered, setHasEntered] = useState(false)

  return (
    <div className="app">
      <Backdrop scene={hasEntered ? 'valley' : 'mountain'} />

      {!hasEntered && <Gate profile={profile} onEnter={() => setHasEntered(true)} />}

      {hasEntered && (
        <>
          <ScrollProgress />
          <main className="site">
            <div className="site-inner">
              <nav className="top-nav">
                <div className="brand">{profile.name}</div>
                <ul>
                  <li><a href="#about">About</a></li>
                  <li><a href="#experience">Experience</a></li>
                  <li><a href="#projects">Projects</a></li>
                  <li><a href="#skills">Skills</a></li>
                  <li><a href="#game">Play</a></li>
                </ul>
              </nav>

              <section className="hero">
                <p className="hero-kicker">{profile.availability}</p>
                <h1>{profile.fullName}</h1>
                <div className="hero-role">{profile.role}</div>
                <p className="hero-tagline">{profile.tagline}</p>
                <div className="hero-actions">
                  <a className="btn-primary" href={profile.resumeFile} download>
                    Download resume
                  </a>
                  <a className="btn-ghost" href={`mailto:${profile.email}`}>
                    Email {profile.name}
                  </a>
                </div>
                <StatRow stats={profile.stats} />
              </section>
            </div>

            <Marquee items={profile.marquee} />

            <div className="site-inner">
              <Interests interests={profile.interests} />
              <Experience experience={profile.experience} />
              <Projects projects={profile.projects} />
              <Skills skills={profile.skills} />
              <CatGame />

              <footer className="site-footer">
                <a href={profile.github} target="_blank" rel="noreferrer">GitHub</a>
                <a href={profile.linkedin} target="_blank" rel="noreferrer">LinkedIn</a>
                <a href={`mailto:${profile.email}`}>{profile.email}</a>
              </footer>
            </div>
          </main>
        </>
      )}

      {hasEntered && <Chat profile={profile} />}
    </div>
  )
}
