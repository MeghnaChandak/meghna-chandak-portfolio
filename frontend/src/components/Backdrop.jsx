import { useEffect, useRef } from 'react'

// ============================================================
// Backdrop.jsx
//
// The full-page background scene. Two "scenes" exist - 'mountain'
// (shown on the gate) and 'valley' (shown on the main site) - and
// they crossfade via CSS opacity (see index.css, .scene-layer).
//
// Each scene is built from:
//   - a painterly sky (several soft blurred color blobs layered
//     over a gradient, not one flat gradient)
//   - a sun/glow circle
//   - three mountain silhouette layers with INCREASING haze and
//     DECREASING saturation toward the back - this is what makes
//     them read as distance instead of flat stacked cutouts
//   - two drifting bird shapes
//   - a grain texture + vignette on top of everything
//
// PARALLAX: as you move the mouse, the three mountain layers each
// shift by a different amount (their `data-depth`), which is what
// creates the sense of depth - the back layer barely moves, the
// front layer moves more. See handleMouseMove below.
// ============================================================

const SCENES = {
  mountain: {
    skyBlobs: [
      'radial-gradient(60% 50% at 70% 15%, rgba(255,214,150,.5), transparent 60%)',
      'radial-gradient(50% 40% at 25% 10%, rgba(255,150,130,.3), transparent 65%)',
      'radial-gradient(80% 60% at 50% 0%, rgba(120,140,190,.4), transparent 70%)',
    ],
    skyBase: 'linear-gradient(180deg, #2b2f45 0%, #4a3b52 35%, #7a4f55 60%, #3a2834 85%, #1b1420 100%)',
    sun: { top: '16%', left: '62%' },
    layers: [
      { fill: '#6b5560', opacity: 0.55, path: 'M0,400 L0,170 L160,90 L320,180 L520,60 L700,190 L900,100 L1080,200 L1180,140 L1180,400 Z' },
      { fill: '#4a3744', opacity: 0.8, path: 'M0,400 L0,220 L220,150 L400,230 L600,120 L800,240 L1000,150 L1180,220 L1180,400 Z' },
      { fill: '#241b26', opacity: 1, path: 'M0,420 L0,290 L260,230 L460,300 L680,210 L900,300 L1120,240 L1180,270 L1180,420 Z' },
    ],
  },
  valley: {
    skyBlobs: [
      'radial-gradient(55% 45% at 30% 10%, rgba(180,210,190,.35), transparent 60%)',
      'radial-gradient(60% 45% at 75% 5%, rgba(140,170,200,.3), transparent 65%)',
    ],
    skyBase: 'linear-gradient(180deg, #1e2a2e 0%, #233a35 40%, #1b2e2a 70%, #10201c 100%)',
    sun: { top: '10%', left: '30%' },
    layers: [
      { fill: '#5a7868', opacity: 0.5, path: 'M0,400 L0,210 Q300,140 600,220 T1180,190 L1180,400 Z' },
      { fill: '#3c5649', opacity: 0.8, path: 'M0,400 L0,270 Q330,210 660,280 T1180,260 L1180,400 Z' },
      { fill: '#1d2e26', opacity: 1, path: 'M0,420 L0,330 Q360,290 720,340 T1180,320 L1180,420 Z' },
    ],
  },
}

export default function Backdrop({ scene }) {
  const containerRef = useRef(null)

  useEffect(() => {
    function handleMouseMove(e) {
      if (!containerRef.current) return
      const x = e.clientX / window.innerWidth - 0.5
      const y = e.clientY / window.innerHeight - 0.5
      // Only move the layers belonging to the currently-visible scene -
      // querying by class here (rather than a ref array) avoids mixing up
      // which layer belongs to which scene now that there are two scenes
      // in the DOM at once.
      const visibleLayers = containerRef.current.querySelectorAll('.scene-layer.is-visible .scene-mountain-layer')
      visibleLayers.forEach((el) => {
        const depth = parseFloat(el.dataset.depth)
        el.style.transform = `translate(${x * depth * -200}px, ${y * depth * -80}px)`
      })
    }
    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  return (
    <div className="backdrop" ref={containerRef}>
      {Object.entries(SCENES).map(([key, config]) => (
        <div key={key} className={`scene-layer ${scene === key ? 'is-visible' : ''}`}>
          <div className="scene-sky" style={{ background: config.skyBase }}>
            {config.skyBlobs.map((blob, i) => (
              <div key={i} className="scene-sky-blob" style={{ background: blob }} />
            ))}
          </div>
          <div className="scene-sun" style={{ top: config.sun.top, left: config.sun.left }} />

          <svg className="scene-bird scene-bird-1" viewBox="0 0 60 30" aria-hidden="true">
            <path d="M4 16Q12 4 20 16Q28 4 36 16" stroke="#1b1420" strokeWidth="2" fill="none" strokeLinecap="round" />
          </svg>
          <svg className="scene-bird scene-bird-2" viewBox="0 0 60 30" aria-hidden="true">
            <path d="M4 16Q12 4 20 16Q28 4 36 16" stroke="#1b1420" strokeWidth="2" fill="none" strokeLinecap="round" />
          </svg>

          {config.layers.map((layer, i) => (
            <div
              key={i}
              className="scene-mountain-layer"
              data-depth={0.02 + i * 0.025}
            >
              <svg viewBox="0 0 1180 420" preserveAspectRatio="none" aria-hidden="true">
                <path d={layer.path} fill={layer.fill} opacity={layer.opacity} />
              </svg>
            </div>
          ))}

          <div className="scene-haze" />
        </div>
      ))}

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
