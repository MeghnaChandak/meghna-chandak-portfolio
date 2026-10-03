import { useEffect, useRef, useState } from 'react'

// ============================================================
// CatGame.jsx
//
// A small playable game: a cat runs along the ground, rocks
// scroll toward it, press Space (or tap on mobile) to jump over
// them. This is a real game loop, not an animation - worth
// understanding if you're new to canvas:
//
//   1. We draw everything onto a <canvas> element using its 2D
//      drawing context (ctx) - ctx.fillRect, ctx.beginPath, etc.
//      are all just "draw a shape at this position."
//   2. requestAnimationFrame(loop) asks the browser to call our
//      `loop` function right before the next repaint - usually
//      about 60 times per second. Each call, we: move things
//      slightly, check for collisions, then redraw everything.
//      That's the entire "animation" - it's just redrawing fast.
//   3. Game state (cat position, rock positions, score) is kept
//      in a plain object (`state.current`, a ref) rather than
//      React state, because it changes every single frame -
//      putting it in useState would cause 60 re-renders a second,
//      which is unnecessary. We only touch React state (`score`,
//      `isOver`) for things the UI actually needs to show.
// ============================================================

const GROUND_Y = 150
const GRAVITY = 0.6
const JUMP_FORCE = -11
const CAT_X = 50
const CAT_SIZE = 28

export default function CatGame() {
  const canvasRef = useRef(null)
  const stateRef = useRef(null)
  const [score, setScore] = useState(0)
  const [best, setBest] = useState(() => Number(localStorage.getItem('catGameBest') || 0))
  const [isOver, setIsOver] = useState(false)
  const [hasStarted, setHasStarted] = useState(false)

  function resetState() {
    stateRef.current = {
      catY: GROUND_Y - CAT_SIZE,
      velocity: 0,
      isJumping: false,
      rocks: [{ x: 400, width: 18, height: 26 }],
      speed: 4,
      frame: 0,
      score: 0,
    }
  }

  function jump() {
    const s = stateRef.current
    if (!s || s.isJumping) return
    s.velocity = JUMP_FORCE
    s.isJumping = true
  }

  function startGame() {
    resetState()
    setScore(0)
    setIsOver(false)
    setHasStarted(true)
  }

  // Lets the game be played by tapping/clicking the canvas, not just Space -
  // important on mobile, which has no keyboard visible by default.
  function handleCanvasClick() {
    if (!hasStarted || isOver) {
      startGame()
    } else {
      jump()
    }
  }

  useEffect(() => {
    function handleKey(e) {
      if (e.code === 'Space') {
        e.preventDefault()
        if (!hasStarted || isOver) {
          startGame()
        } else {
          jump()
        }
      }
    }
    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [hasStarted, isOver])

  useEffect(() => {
    if (!hasStarted) return
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    let animationId

    function loop() {
      const s = stateRef.current
      if (!s) return

      // --- physics: apply gravity, move the cat, don't fall through the ground ---
      s.velocity += GRAVITY
      s.catY += s.velocity
      if (s.catY > GROUND_Y - CAT_SIZE) {
        s.catY = GROUND_Y - CAT_SIZE
        s.velocity = 0
        s.isJumping = false
      }

      // --- move rocks left, add a new one once the last is far enough along ---
      s.rocks.forEach((r) => (r.x -= s.speed))
      s.rocks = s.rocks.filter((r) => r.x > -30)
      const last = s.rocks[s.rocks.length - 1]
      if (!last || last.x < 220) {
        s.rocks.push({ x: 420 + Math.random() * 80, width: 16 + Math.random() * 10, height: 22 + Math.random() * 14 })
      }

      // --- collision check: does the cat's box overlap a rock's box? ---
      const catBox = { x: CAT_X, y: s.catY, w: CAT_SIZE, h: CAT_SIZE }
      for (const r of s.rocks) {
        const rockBox = { x: r.x, y: GROUND_Y - r.height, w: r.width, h: r.height }
        const overlapping =
          catBox.x < rockBox.x + rockBox.w &&
          catBox.x + catBox.w > rockBox.x &&
          catBox.y < rockBox.y + rockBox.h &&
          catBox.y + catBox.h > rockBox.y
        if (overlapping) {
          setIsOver(true)
          const finalScore = Math.floor(s.score)
          setScore(finalScore)
          if (finalScore > best) {
            setBest(finalScore)
            localStorage.setItem('catGameBest', String(finalScore))
          }
          return // stop the loop - game over
        }
      }

      // --- score increases over time, and the game slowly speeds up ---
      s.frame++
      s.score += 0.08
      if (s.frame % 300 === 0) s.speed += 0.4
      setScore(Math.floor(s.score))

      draw(ctx, s)
      animationId = requestAnimationFrame(loop)
    }

    animationId = requestAnimationFrame(loop)
    return () => cancelAnimationFrame(animationId)
  }, [hasStarted, isOver, best])

  function draw(ctx, s) {
    const w = 440, h = 180
    ctx.clearRect(0, 0, w, h)

    // ground line
    ctx.strokeStyle = 'rgba(244,238,227,0.35)'
    ctx.lineWidth = 2
    ctx.beginPath()
    ctx.moveTo(0, GROUND_Y)
    ctx.lineTo(w, GROUND_Y)
    ctx.stroke()

    // rocks
    ctx.fillStyle = '#8B7F68'
    s.rocks.forEach((r) => {
      ctx.beginPath()
      ctx.moveTo(r.x, GROUND_Y)
      ctx.lineTo(r.x + r.width / 2, GROUND_Y - r.height)
      ctx.lineTo(r.x + r.width, GROUND_Y)
      ctx.closePath()
      ctx.fill()
    })

    // cat: a simple rounded body + two triangle ears + a tail
    const catY = s.catY
    ctx.fillStyle = '#D97B5C'
    ctx.beginPath()
    ctx.roundRect(CAT_X, catY, CAT_SIZE, CAT_SIZE * 0.75, 8)
    ctx.fill()
    ctx.beginPath()
    ctx.moveTo(CAT_X + 2, catY)
    ctx.lineTo(CAT_X + 7, catY - 9)
    ctx.lineTo(CAT_X + 11, catY)
    ctx.closePath()
    ctx.fill()
    ctx.beginPath()
    ctx.moveTo(CAT_X + CAT_SIZE - 11, catY)
    ctx.lineTo(CAT_X + CAT_SIZE - 7, catY - 9)
    ctx.lineTo(CAT_X + CAT_SIZE - 2, catY)
    ctx.closePath()
    ctx.fill()
    // tail
    ctx.strokeStyle = '#D97B5C'
    ctx.lineWidth = 4
    ctx.lineCap = 'round'
    ctx.beginPath()
    ctx.moveTo(CAT_X, catY + 10)
    ctx.quadraticCurveTo(CAT_X - 10, catY + 2, CAT_X - 8, catY - 8)
    ctx.stroke()
  }

  return (
    <section className="cat-game" id="game">
      <h2>Beat the cat's high score</h2>
      <p className="section-hint">Press Space to jump. Built as a small canvas game - no library, just the DOM.</p>

      <div className="cat-game-frame">
        <canvas ref={canvasRef} width={440} height={180} onClick={handleCanvasClick} />
        {!hasStarted && (
          <div className="cat-game-overlay">
            <button className="btn-primary" onClick={startGame}>Press Space or click to play</button>
          </div>
        )}
        {isOver && (
          <div className="cat-game-overlay">
            <p>Score: {score} {score >= best && score > 0 ? '— new best!' : `· Best: ${best}`}</p>
            <button className="btn-primary" onClick={startGame}>Play again</button>
          </div>
        )}
      </div>

      {hasStarted && !isOver && (
        <div className="cat-game-score">Score: {score} · Best: {best}</div>
      )}
    </section>
  )
}
