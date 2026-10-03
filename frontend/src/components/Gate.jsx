// ============================================================
// Gate.jsx
//
// The entry screen. The Backdrop (mountain scene) renders behind
// this component - see App.jsx. This file only adds the content
// that sits ON TOP of that scene: the nav strip, the name, the
// tagline, the Enter button, and the foreground silhouette (a
// seated figure, a dog, and a trekking pole planted like a small
// flag) that carries the "trekker who loves animals" identity
// through a single image rather than a row of text badges.
//
// Clicking "Enter" calls `onEnter`, a function App.jsx passed in -
// that's what triggers both the backdrop crossfade AND the switch
// to the main site at the same time.
// ============================================================

export default function Gate({ profile, onEnter }) {
  return (
    <section className="gate">
      <div className="gate-top">
        <span>Portfolio · 2026</span>
        <span>{profile.role}</span>
      </div>

      {/* Foreground silhouette: seated figure + dog at a summit ledge */}
      <svg className="gate-figure" viewBox="0 0 150 90" aria-hidden="true">
        <path d="M0 80 Q40 70 75 76 Q110 70 150 80 L150 90 L0 90Z" fill="#161018" />
        <path d="M58 76 Q56 56 66 50 Q70 44 76 48 Q82 44 85 50 Q90 56 86 76Z" fill="#1b1420" />
        <circle cx="72" cy="42" r="7" fill="#1b1420" />
        <path d="M98 76 Q96 62 104 58 Q106 52 112 56 Q116 50 120 56 Q122 64 118 76Z" fill="#1b1420" />
        <path d="M100 56 L96 48 L104 52Z" fill="#1b1420" />
        <path d="M40 78 L40 44" stroke="#1b1420" strokeWidth="2" strokeLinecap="round" />
        <path d="M40 44 L54 48 L40 52Z" fill="#F0C98A" />
      </svg>

      <div className="gate-center">
        {/* This scrim sits only behind the text block, darkening whatever part
            of the sky/sun/mountains is directly behind it - this is the fix
            for text becoming unreadable when it lands on a bright sky patch. */}
        <div className="gate-text-scrim">
          <p className="gate-kicker">{profile.availability}</p>
          <h1 className="gate-name">
            <span className="gate-name-up">{profile.name.split(' ')[0]}</span>
            <span className="gate-name-lo">{profile.name.split(' ').slice(1).join(' ')}</span>
          </h1>
          <p className="gate-tagline">{profile.tagline}</p>
          <button className="enter-button" onClick={onEnter}>
            Enter portfolio
          </button>
        </div>
      </div>

      <div className="gate-bottom">
        <span>&copy; {new Date().getFullYear()} {profile.name}</span>
        <span>Scroll or click to continue</span>
      </div>
    </section>
  )
}
