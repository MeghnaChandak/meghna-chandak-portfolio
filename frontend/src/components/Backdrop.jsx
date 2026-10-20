import { useEffect, useRef } from 'react'

// ============================================================
// Backdrop.jsx
//
// REWORK: this used to render on BOTH the gate and the main site
// (two scenes, 'mountain' and 'valley', crossfading between them).
// That caused a real bug: wherever the sun/sky/mountain shapes sat
// behind body text, contrast broke unpredictably as you scrolled.
//
// Fix at the source, not with more scrims: the painterly scene now
// renders ONLY on the gate (see App.jsx - this component is no
// longer mounted at all once you've entered the main site). The
// main site uses a single flat background color instead (set on
// <body> in index.css), which is what makes a content-heavy page
// reliably readable.
//
// So this file only needs ONE scene now, not two - simpler than
// before, and the parallax-on-mousemove effect is unchanged.
// ============================================================

const SCENE = {
  skyBlobs: [
    'radial-gradient(60% 50% at 70% 15%, rgba(140,150,170,.3), transparent 60%)',
    'radial-gradient(80% 60% at 50% 0%, rgba(90,100,130,.3), transparent 70%)',
  ],
  skyBase: 'linear-gradient(180deg, #1c1e26 0%, #22242e 40%, #1a1a20 70%, #0d0e11 100%)',
  sun: { top: '16%', left: '62%' },
  layers: [
    { fill: '#3a3d46', opacity: 0.55, path: 'M0,400 L0,170 L160,90 L320,180 L520,60 L700,190 L900,100 L1080,200 L1180,140 L1180,400 Z' },
    { fill: '#26282f', opacity: 0.8, path: 'M0,400 L0,220 L220,150 L400,230 L600,120 L800,240 L1000,150 L1180,220 L1180,400 Z' },
    { fill: '#121318', opacity: 1, path: 'M0,420 L0,290 L260,230 L460,300 L680,210 L900,300 L1120,240 L1180,270 L1180,420 Z' },
  ],
}

export default function Backdrop() {
  const containerRef = useRef(null)

  useEffect(() => {
    function handleMouseMove(e) {
      if (!containerRef.current) return
      const x = e.clientX / window.innerWidth - 0.5
      const y = e.clientY / window.innerHeight - 0.5
      const layers = containerRef.current.querySelectorAll('.scene-mountain-layer')
      layers.forEach((el) => {
        const depth = parseFloat(el.dataset.depth)
        el.style.transform = `translate(${x * depth * -200}px, ${y * depth * -80}px)`
      })
    }
    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  return (
    <div className="backdrop" ref={containerRef}>
      <div className="scene-layer is-visible">
        <div className="scene-sky" style={{ background: SCENE.skyBase }}>
          {SCENE.skyBlobs.map((blob, i) => (
            <div key={i} className="scene-sky-blob" style={{ background: blob }} />
          ))}
        </div>
        <div className="scene-sun" style={{ top: SCENE.sun.top, left: SCENE.sun.left }} />

        <svg className="scene-bird scene-bird-1" viewBox="0 0 60 30" aria-hidden="true">
          <path d="M4 16Q12 4 20 16Q28 4 36 16" stroke="#1b1420" strokeWidth="2" fill="none" strokeLinecap="round" />
        </svg>
        <svg className="scene-bird scene-bird-2" viewBox="0 0 60 30" aria-hidden="true">
          <path d="M4 16Q12 4 20 16Q28 4 36 16" stroke="#1b1420" strokeWidth="2" fill="none" strokeLinecap="round" />
        </svg>

        {SCENE.layers.map((layer, i) => (
          <div key={i} className="scene-mountain-layer" data-depth={0.02 + i * 0.025}>
            <svg viewBox="0 0 1180 420" preserveAspectRatio="none" aria-hidden="true">
              <path d={layer.path} fill={layer.fill} opacity={layer.opacity} />
            </svg>
          </div>
        ))}

        <div className="scene-haze" />
      </div>

      <svg className="scene-grain" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
        <filter id="grainFilter">
          <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="2" stitchTiles="stitch" />
        </filter>
        <rect width="100" height="100" filter="url(#grainFilter)" />
      </svg>
      <div className="scene-vignette" />
    </div>
  )
}
