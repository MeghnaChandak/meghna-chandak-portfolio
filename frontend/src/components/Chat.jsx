import { useState, useRef, useEffect } from 'react'

// ============================================================
// Chat.jsx
//
// Now a floating chat BUBBLE (bottom-right corner, present on
// every screen) instead of a big box sitting in the hero. This
// is the same backend wiring as before - fetch('/ask', ...) -
// just repositioned so it doesn't compete with the hero for a
// recruiter's first few seconds of attention.
//
// `isOpen` controls whether the bubble is collapsed (just an
// icon) or expanded (the full chat panel). Clicking the bubble
// toggles it.
// ============================================================

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000'

export default function Chat({ profile }) {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState([
    { role: 'bot', text: `Hi, ask me anything about ${profile.name}.` },
  ])
  const [input, setInput] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const logRef = useRef(null)

  // Auto-scroll to the newest message whenever the list changes.
  useEffect(() => {
    if (logRef.current) logRef.current.scrollTop = logRef.current.scrollHeight
  }, [messages, isTyping])

  async function askQuestion(question) {
    const trimmed = question.trim()
    if (!trimmed || isTyping) return

    setMessages((prev) => [...prev, { role: 'user', text: trimmed }])
    setInput('')
    setIsTyping(true)

    try {
      const response = await fetch(`${API_URL}/ask`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ question: trimmed }),
      })
      if (!response.ok) throw new Error('request failed')
      const data = await response.json()
      setMessages((prev) => [...prev, { role: 'bot', text: data.answer }])
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        { role: 'bot', text: "Sorry, the assistant isn't reachable right now. Try again in a moment." },
      ])
    } finally {
      setIsTyping(false)
    }
  }

  function handleSubmit(e) {
    e.preventDefault()
    askQuestion(input)
  }

  return (
    <div className="chat-bubble-wrap">
      {isOpen && (
        <div className="chat-panel">
          <div className="chat-head">
            <div>
              <b>Ask about {profile.name}</b>
              <small>Answers only from her real profile</small>
            </div>
            <button className="chat-close" onClick={() => setIsOpen(false)} aria-label="Close chat">
              &times;
            </button>
          </div>

          <div className="chat-log" ref={logRef}>
            {messages.map((m, i) => (
              <div key={i} className={`chat-msg chat-msg-${m.role}`}>{m.text}</div>
            ))}
            {isTyping && <div className="chat-msg chat-msg-bot chat-msg-typing">...</div>}
          </div>

          <div className="chat-chips">
            {profile.sampleQA.map((qa) => (
              <button key={qa.question} className="chip" onClick={() => askQuestion(qa.question)} disabled={isTyping}>
                {qa.question}
              </button>
            ))}
          </div>

          <form className="chat-input-row" onSubmit={handleSubmit}>
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask a question..."
              maxLength={300}
              disabled={isTyping}
            />
            <button type="submit" disabled={isTyping || !input.trim()}>Send</button>
          </form>
        </div>
      )}

      <button
        className="chat-fab"
        onClick={() => setIsOpen((v) => !v)}
        aria-label={isOpen ? 'Close chat' : 'Ask about Meghna'}
      >
        {isOpen ? (
          <svg viewBox="0 0 24 24" width="22" height="22"><path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" fill="none" /></svg>
        ) : (
          <svg viewBox="0 0 24 24" width="22" height="22"><path d="M4 4h16v12H8l-4 4V4z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" fill="none" /></svg>
        )}
      </button>
    </div>
  )
}
