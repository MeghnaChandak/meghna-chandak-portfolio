// ============================================================
// Marquee.jsx
//
// A horizontally scrolling strip of short phrases, like the
// bottom bar on the Shouri reference site. The scrolling itself
// is pure CSS (see .marquee-track in index.css) - this component
// just renders the list TWICE in a row, back to back.
//
// WHY TWICE: a CSS animation that slides a track left by exactly
// its own width, then jumps back to 0, looks like one continuous
// loop ONLY if there's a second identical copy right after the
// first - otherwise you'd see a gap/snap each time it resets.
// ============================================================

export default function Marquee({ items }) {
  return (
    <div className="marquee">
      <div className="marquee-track">
        {[...items, ...items].map((item, i) => (
          <span key={i} className="marquee-item">
            {item} <span className="marquee-dot">·</span>
          </span>
        ))}
      </div>
    </div>
  )
}
