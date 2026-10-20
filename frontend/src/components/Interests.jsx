// ============================================================
// Interests.jsx
//
// REWRITE: previously three emoji-headed cards ("🏔️ Trekking",
// "🏃 Athletics", "🐾 Animals"). Emoji icons read as casual at
// this level, and splitting personality into separate labeled
// cards feels like a form, not a voice. This version folds the
// same facts into flowing paragraphs with bold inline keywords -
// closer to how a confident "about me" paragraph actually reads
// (see shlok.tech for the reference point).
//
// Write paragraphs in profile.js using **word** to bold a phrase,
// e.g. "I spend weekends **trekking** in the Sahyadris." This
// function turns that into real <strong> elements safely - it
// never injects raw HTML, so there's no XSS risk even though the
// text comes from a data file you control.
// ============================================================

function renderWithBold(text) {
  const parts = text.split(/\*\*(.+?)\*\*/g) // odd indices are the bolded phrases
  return parts.map((part, i) => (i % 2 === 1 ? <strong key={i}>{part}</strong> : part))
}

export default function Interests({ aboutParagraphs }) {
  return (
    <section className="interests" id="about">
      <h2>About</h2>
      {aboutParagraphs.map((p, i) => (
        <p className="about-paragraph" key={i}>
          {renderWithBold(p)}
        </p>
      ))}
    </section>
  )
}
