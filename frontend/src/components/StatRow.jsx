// ============================================================
// StatRow.jsx
//
// Renders profile.stats as a simple row. Deliberately NOT
// animated with a count-up effect here - see the note in
// profile.js: these numbers must be real and small (e.g. "3
// projects"), and animating a count-up to a tiny real number
// looks silly, not impressive. If your numbers grow later (e.g.
// "40 GitHub repos"), a count-up becomes worth adding back.
// ============================================================

export default function StatRow({ stats }) {
  return (
    <div className="stat-row">
      {stats.map((s) => (
        <div className="stat" key={s.label}>
          <b>{s.value}</b>
          <span>{s.label}</span>
        </div>
      ))}
    </div>
  )
}
