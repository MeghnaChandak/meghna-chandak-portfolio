// ============================================================
// Doodles.jsx
//
// Small hand-drawn-style line-art (a cat, a bird, a fern, two
// flowers). Each one is plain SVG using only <path>, <circle> etc,
// so there's nothing to "load" - they're just drawn with code.
//
// `variant` picks which doodle to draw, and `className` lets the
// parent component position it (see index.css for the .doodle-*
// position classes used on the Gate).
// ============================================================

const paths = {
  fern: (
    <>
      <path d="M30 125 L30 60" />
      <path d="M30 92 Q16 84 20 70 Q26 76 30 84" />
      <path d="M30 70 Q18 60 22 46 Q28 52 30 62" />
      <path d="M30 46 Q20 34 26 20 Q32 28 32 40" />
    </>
  ),
  bird: (
    <>
      <ellipse cx="26" cy="26" rx="18" ry="13" />
      <circle cx="14" cy="20" r="1.6" fill="currentColor" stroke="none" />
      <path d="M8 22 L0 25 L8 18Z" />
      <path d="M18 14 Q26 4 34 12" />
      <path d="M14 36 L10 44 M20 38 L18 46" />
    </>
  ),
  flowerTall: (
    <>
      <path d="M24 108 L24 40" />
      <path d="M14 60 Q4 50 12 40 Q22 48 20 60" />
      <ellipse cx="24" cy="18" rx="13" ry="15" />
      <path d="M24 18 q-4 -10 3 -14 q6 4 3 14" />
      <path d="M24 18 q6 -8 13 -4 q-1 8 -13 8" />
    </>
  ),
  flowerRound: (
    <>
      <circle cx="26" cy="26" r="12" />
      <path d="M26 14q-3-7 3-9q4 5-3 9" />
      <path d="M14 26q-7-3-9 3q5 4 9-3" />
      <path d="M26 38q3 7-3 9q-4-5 3-9" />
      <path d="M38 26q7 3 9-3q-5-4-9 3" />
    </>
  ),
  cat: (
    <>
      <path d="M8 42 Q4 20 20 16 Q22 4 30 12 Q38 2 42 12 Q56 12 54 30" />
      <ellipse cx="34" cy="38" rx="26" ry="18" />
      <circle cx="24" cy="34" r="1.6" fill="currentColor" stroke="none" />
      <circle cx="40" cy="34" r="1.6" fill="currentColor" stroke="none" />
      <path d="M28 44 Q34 48 40 44" />
      <path d="M58 40 Q78 34 74 52 Q66 58 58 50" />
    </>
  ),
}

const viewBoxes = {
  fern: '0 0 60 130',
  bird: '0 0 60 50',
  flowerTall: '0 0 70 110',
  flowerRound: '0 0 60 60',
  cat: '0 0 90 70',
}

export default function Doodle({ variant, className = '' }) {
  return (
    <svg
      className={`doodle ${className}`}
      viewBox={viewBoxes[variant]}
      aria-hidden="true"
    >
      {paths[variant]}
    </svg>
  )
}
