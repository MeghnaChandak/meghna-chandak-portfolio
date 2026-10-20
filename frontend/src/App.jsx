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
import CommandPalette from './components/CommandPalette.jsx'

// ============================================================
// App.jsx
//
// - <Backdrop /> (the painterly mountain scene) now mounts ONLY on
//   the gate, not the main site - see Backdrop.jsx for why.
// - enter()/back() both reset scroll to the top, so switching
//   between the gate and the main site never leaves you looking at
//   a half-scrolled version of either.
// - The command palette's `commands` array is where you'd add any
//   new quick-action later (e.g. "Copy email") - each command is
//   just a label plus a function to run.
// ============================================================

function scrollToId(id) {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
}

export default function App() {
  const [hasEntered, setHasEntered] = useState(false)

  function enter() {
    setHasEntered(true)
    window.scrollTo(0, 0)
  }

  function back() {
    setHasEntered(false)
    window.scrollTo(0, 0)
  }

  const commands = [
    { label: 'Go to About', hint: 'section', action: () => scrollToId('about') },
    { label: 'Go to Experience', hint: 'section', action: () => scrollToId('experience') },
    { label: 'Go to Projects', hint: 'section', action: () => scrollToId('projects') },
    { label: 'Go to Skills', hint: 'section', action: () => scrollToId('skills') },
    { label: 'Play the cat game', hint: 'section', action: () => scrollToId('game') },
    { label: 'Download resume', hint: 'file', action: () => window.open(profile.resumeFile, '_blank') },
    { label: 'Email Meghna', hint: 'mailto', action: () => window.open(`mailto:${profile.email}`) },
    { label: 'Open GitHub', hint: 'link', action: () => window.open(profile.github, '_blank') },
    { label: 'Open LinkedIn', hint: 'link', action: () => window.open(profile.linkedin, '_blank') },
    { label: 'Back to entry screen', hint: 'go back', action: back },
  ]

  return (
    <div className="app">
      {!hasEntered && <Backdrop />}
      {!hasEntered && <Gate profile={profile} onEnter={enter} />}

      {hasEntered && (
        <>
          <ScrollProgress />
          <main className="site">
            <div className="site-inner">
              <nav className="top-nav">
                <button className="brand brand-button" onClick={back} aria-label="Back to entry screen">
                  {profile.name}
                </button>
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
              <Interests aboutParagraphs={profile.aboutParagraphs} />
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
      {hasEntered && <CommandPalette commands={commands} />}
    </div>
  )
}
