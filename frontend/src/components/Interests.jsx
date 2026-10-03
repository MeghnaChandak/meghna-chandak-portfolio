// ============================================================
// Interests.jsx
//
// A grid of "beyond the code" cards - an emoji, a title, and a
// real paragraph. This is the fix for personality being "locked
// inside an image": the summit silhouette on the gate looks
// nice, but a screen reader, a search engine, or someone quickly
// skimming text can't get anything from an SVG. This section
// says the same things in plain, readable sentences.
// ============================================================

export default function Interests({ interests }) {
  return (
    <section className="interests" id="about">
      <h2>Beyond the code</h2>
      <p className="section-hint">The stuff I actually think about when I'm not at the keyboard.</p>
      <div className="interests-grid">
        {interests.map((item) => (
          <div className="interest-card" key={item.title}>
            <div className="interest-icon">{item.icon}</div>
            <h3>{item.title}</h3>
            <p>{item.body}</p>
          </div>
        ))}
      </div>
    </section>
  )
}
