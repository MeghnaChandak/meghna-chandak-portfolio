import { useEffect, useState } from 'react'

// ============================================================
// ScrollProgress.jsx
//
// A thin bar fixed to the top of the screen that fills left-to-
// right as you scroll down the page - a small polish detail that
// tells a visitor "there's more below" and "here's roughly how
// much is left."
//
// The math: (how far scrolled) / (total scrollable distance) * 100.
// "Total scrollable distance" is the full page height minus one
// viewport height (since you can't scroll past the point where
// the bottom of the page meets the bottom of the screen).
// ============================================================

export default function ScrollProgress() {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    function handleScroll() {
      const scrollTop = window.scrollY
      const scrollableHeight = document.documentElement.scrollHeight - window.innerHeight
      const pct = scrollableHeight > 0 ? (scrollTop / scrollableHeight) * 100 : 0
      setProgress(pct)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll() // set the correct value immediately, don't wait for the first scroll event
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <div className="scroll-progress-track">
      <div className="scroll-progress-fill" style={{ width: `${progress}%` }} />
    </div>
  )
}
