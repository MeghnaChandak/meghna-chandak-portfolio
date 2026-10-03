import { useEffect, useRef, useState } from 'react'

// ============================================================
// Skills.jsx
//
// This renders your skills, grouped into columns (Languages,
// Frameworks, etc - see profile.js). It also demonstrates ONE
// deliberate animation: each skill tag fades and slides in,
// staggered slightly, but only once, and only when you actually
// scroll down to this section - not immediately on page load.
//
// HOW THE ANIMATION WORKS (useIntersectionObserver is a browser
// feature, not a library):
//   1. `ref` is attached to the <section> below.
//   2. IntersectionObserver watches that section and tells us
//      when it scrolls into view.
//   3. When it does, we set `isVisible` to true, which adds the
//      "is-visible" CSS class - and that class is what triggers
//      the animation in index.css.
//   4. We only do this once (see `hasAnimated`), so scrolling up
//      and down doesn't replay it every time.
// ============================================================

export default function Skills({ skills }) {
  const sectionRef = useRef(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const node = sectionRef.current
    if (!node) return

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setIsVisible(true)
          observer.disconnect() // stop watching once it's played
        }
      },
      { threshold: 0.2 } // trigger once 20% of the section is visible
    )

    observer.observe(node)
    return () => observer.disconnect()
  }, [])

  return (
    <section className={`skills ${isVisible ? 'is-visible' : ''}`} id="skills" ref={sectionRef}>
      <h2>Skills</h2>
      <div className="skills-grid">
        {Object.entries(skills).map(([group, items]) => (
          <div className="skills-group" key={group}>
            <h3>{group}</h3>
            <div className="skills-tags">
              {items.map((item, i) => (
                <span
                  className="skill-tag"
                  key={item}
                  style={{ transitionDelay: `${i * 60}ms` }} // this creates the "stagger"
                >
                  {item}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
