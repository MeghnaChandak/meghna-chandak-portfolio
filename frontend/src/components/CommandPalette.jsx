import { useEffect, useRef, useState } from 'react'

// ============================================================
// CommandPalette.jsx
//
// A keyboard-driven quick-navigation menu - press Cmd+K (Mac) or
// Ctrl+K (Windows/Linux) anywhere on the site to open it, type to
// filter, arrow keys to move, Enter to run. This is a genuinely
// useful pattern (Linear, Raycast, GitHub, Vercel's dashboard all
// have one), not just decoration - it's also doing real work here:
// it's the only way to navigate on mobile, where the top-nav links
// are hidden to save space (see the "⌘K" button that's always
// visible, phone or desktop).
//
// WHAT TO LEARN FROM THIS FILE IF YOU'RE NEW TO REACT:
//   - Keeping a `highlighted` index in state and moving it with
//     ArrowUp/ArrowDown is the standard way to build any keyboard-
//     navigable list (a dropdown, an autocomplete, this).
//   - useRef + useEffect to auto-focus the input when the palette
//     opens, and to move focus back to whatever opened it when it
//     closes - this matters for both usability and accessibility.
//   - role="dialog" + aria-modal="true" + a visible label are what
//     make a custom popup like this understandable to screen readers,
//     not just sighted mouse users.
// ============================================================

export default function CommandPalette({ commands }) {
  const [isOpen, setIsOpen] = useState(false)
  const [query, setQuery] = useState('')
  const [highlighted, setHighlighted] = useState(0)
  const inputRef = useRef(null)
  const openerRef = useRef(null) // whatever element had focus before we opened

  const filtered = commands.filter((c) => c.label.toLowerCase().includes(query.toLowerCase()))

  function open() {
    openerRef.current = document.activeElement
    setQuery('')
    setHighlighted(0)
    setIsOpen(true)
  }

  function close() {
    setIsOpen(false)
    if (openerRef.current && openerRef.current.focus) openerRef.current.focus()
  }

  function runCommand(command) {
    command.action()
    close()
  }

  // Global shortcut: Cmd/Ctrl+K opens it from anywhere, Escape closes it.
  useEffect(() => {
    function handleKeyDown(e) {
      const isShortcut = (e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k'
      if (isShortcut) {
        e.preventDefault()
        isOpen ? close() : open()
      } else if (e.key === 'Escape' && isOpen) {
        close()
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [isOpen])

  // Focus the search input the moment the palette opens.
  useEffect(() => {
    if (isOpen && inputRef.current) inputRef.current.focus()
  }, [isOpen])

  function handleListKeyDown(e) {
    if (e.key === 'ArrowDown') {
      e.preventDefault()
      setHighlighted((i) => Math.min(i + 1, filtered.length - 1))
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      setHighlighted((i) => Math.max(i - 1, 0))
    } else if (e.key === 'Enter' && filtered[highlighted]) {
      runCommand(filtered[highlighted])
    }
  }

  return (
    <>
      <button className="cmdk-trigger" onClick={open} aria-label="Open command menu">
        <span>⌘</span>K
      </button>

      {isOpen && (
        <div className="cmdk-overlay" onClick={close}>
          <div
            className="cmdk-panel"
            role="dialog"
            aria-modal="true"
            aria-label="Command menu"
            onClick={(e) => e.stopPropagation()} // clicking inside shouldn't close it
          >
            <input
              ref={inputRef}
              className="cmdk-input"
              type="text"
              placeholder="Type a command or search..."
              value={query}
              onChange={(e) => {
                setQuery(e.target.value)
                setHighlighted(0)
              }}
              onKeyDown={handleListKeyDown}
            />
            <ul className="cmdk-list" role="listbox">
              {filtered.length === 0 && <li className="cmdk-empty">No matching command</li>}
              {filtered.map((c, i) => (
                <li
                  key={c.label}
                  role="option"
                  aria-selected={i === highlighted}
                  className={`cmdk-item ${i === highlighted ? 'is-highlighted' : ''}`}
                  onMouseEnter={() => setHighlighted(i)}
                  onClick={() => runCommand(c)}
                >
                  <span>{c.label}</span>
                  {c.hint && <span className="cmdk-hint">{c.hint}</span>}
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </>
  )
}
