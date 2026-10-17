import { useState, useEffect, useRef } from 'react'
import { THEMES } from './themes'
import { other, winner, bestMove, aiMove } from './logic'
import { beep, confetti, reduce } from './effects'
import Mark from './components/Mark'

export default function App() {
  const [mode, setMode] = useState('cpu')
  const [level, setLevel] = useState('medium')
  const [starter, setStarter] = useState('X')
  const [history, setHistory] = useState([])
  const [score, setScore] = useState({ X: 0, O: 0, T: 0 })
  const [sound, setSound] = useState(true)
  const [hint, setHint] = useState(null)
  const [theme, setTheme] = useState('sunset')
  const boardRef = useRef(null)
  const human = 'X'

  // theme -> CSS variables on <html>
  useEffect(() => {
    const r = document.documentElement
    const t = THEMES.find((x) => x.id === theme)
    Object.keys(THEMES.find((x) => x.v).v).forEach((k) => r.style.removeProperty('--' + k))
    r.style.removeProperty('color-scheme')
    if (t.v) {
      Object.keys(t.v).forEach((k) => r.style.setProperty('--' + k, t.v[k]))
      r.style.setProperty('color-scheme', t.dark ? 'dark' : 'light')
    }
  }, [theme])

  // game state is derived from the move history
  const board = Array(9).fill(null)
  history.forEach((m) => { board[m.i] = m.p })
  const turn = history.length ? other(history[history.length - 1].p) : starter
  const w = winner(board)
  const tie = !w && board.every(Boolean)
  const over = !!w || tie
  const aiTurn = mode === 'cpu' && turn !== human && !over
  const names = mode === 'cpu' ? { X: 'You', O: 'Computer' } : { X: 'Player 1', O: 'Player 2' }
  const sfx = (f, d, t) => { if (sound) beep(f, d, t) }

  function reset(opts = {}) {
    setHistory([])
    setHint(null)
    if (opts.scores) setScore({ X: 0, O: 0, T: 0 })
    if (opts.starter) setStarter(opts.starter)
  }

  // score + effects when a round ends
  useEffect(() => {
    if (!history.length) return
    if (w) {
      setScore((s) => ({ ...s, [w.p]: s[w.p] + 1 }))
      const good = mode === 'friend' || w.p === human
      sfx(good ? 740 : 200, 0.4, good ? 'triangle' : 'sawtooth')
      if (good) confetti(['#ff4d6d', '#2d9cdb', '#ffc93c', '#3ddc97', '#ffffff'])
    } else if (tie) {
      setScore((s) => ({ ...s, T: s.T + 1 }))
      sfx(300, 0.3)
    }
  }, [history])

  // computer move
  useEffect(() => {
    if (!aiTurn) return
    const t = setTimeout(() => place(aiMove(board, turn, level)), 520)
    return () => clearTimeout(t)
  }, [aiTurn, history])

  function place(i) {
    setHint(null)
    setHistory((hs) => [...hs, { i, p: turn }])
    sfx(turn === 'X' ? 520 : 400, 0.12)
  }

  const undoCount = mode === 'friend' ? 1 : history.length >= 2 ? 2 : 0
  const canUndo = !over && !aiTurn && undoCount > 0 && history.length >= undoCount
  const undo = () => { setHistory((hs) => hs.slice(0, hs.length - undoCount)); setHint(null) }

  function tilt(e) {
    const el = boardRef.current
    if (!el || reduce) return
    const r = el.getBoundingClientRect()
    const x = (e.clientX - r.left) / r.width - 0.5
    const y = (e.clientY - r.top) / r.height - 0.5
    el.style.setProperty('--ry', x * 10 + 'deg')
    el.style.setProperty('--rx', -y * 10 + 'deg')
  }
  function untilt() {
    const el = boardRef.current
    if (el) { el.style.setProperty('--rx', '0deg'); el.style.setProperty('--ry', '0deg') }
  }

  const status = w
    ? mode === 'cpu' ? (w.p === human ? 'You won! 🎉' : 'Computer wins 🤖') : names[w.p] + ' wins! 🎉'
    : tie ? "It's a tie 🤝"
    : aiTurn ? 'Computer is thinking…'
    : mode === 'cpu' ? 'Your turn' : names[turn] + "'s turn"

  const switchMode = (m) => { setMode(m); reset({ scores: true, starter: 'X' }) }
  const player = (p, right) => (
    <div className={'pl' + (right ? ' r' : '') + (!over && turn === p ? ' on' : '')}>
      <Mark p={p} cls="badge" />
      <div><small>{names[p]}</small><b>{score[p]}</b></div>
    </div>
  )

  return (
    <div className="app">
      <h1><span className="x">Tic</span>-Tac-<span className="o">Toe</span></h1>

      <div className="tabs" role="tablist">
        <button className="tab" role="tab" aria-selected={mode === 'cpu'} onClick={() => switchMode('cpu')}>🤖 vs Computer</button>
        <button className="tab" role="tab" aria-selected={mode === 'friend'} onClick={() => switchMode('friend')}>👫 vs Friend</button>
      </div>

      <div className="themes" role="group" aria-label="Colour theme">
        {THEMES.map((t) => (
          <button key={t.id} className="sw" aria-pressed={theme === t.id} aria-label={t.name + ' theme'} title={t.name}
            style={{ background: `linear-gradient(135deg,${t.sw[0]} 50%,${t.sw[1]} 50%)` }}
            onClick={() => { setTheme(t.id); sfx(620, 0.08) }} />
        ))}
      </div>

      {mode === 'cpu' && (
        <div className="opts">
          <span>Level</span>
          {['easy', 'medium', 'hard'].map((l) => (
            <button key={l} className="chip" aria-pressed={level === l} onClick={() => { setLevel(l); reset({ scores: true }) }}>
              {l === 'hard' ? 'Unbeatable' : l[0].toUpperCase() + l.slice(1)}
            </button>
          ))}
        </div>
      )}

      <div className="players">
        {player('X', false)}
        <div className="tie"><small>Ties</small><b>{score.T}</b></div>
        {player('O', true)}
      </div>

      <p className="status" aria-live="polite">{status}</p>

      <div className="stage" onPointerMove={tilt} onPointerLeave={untilt}>
        <div className="board" ref={boardRef} role="grid" aria-label="Tic-tac-toe board">
          {board.map((v, i) => (
            <button key={i} className={'cell' + (w && w.line.includes(i) ? ' win' : '') + (hint === i ? ' hint' : '')}
              disabled={!!v || over || aiTurn} onClick={() => place(i)}
              aria-label={`Row ${Math.floor(i / 3) + 1}, column ${(i % 3) + 1}${v ? ': ' + v : ': empty'}`}>
              {v ? <Mark p={v} cls="pop" /> : null}
            </button>
          ))}
        </div>
      </div>

      <div className="bar">
        <button className="act" disabled={!canUndo} onClick={undo}>↶ Undo</button>
        <button className="act" disabled={over || aiTurn} onClick={() => setHint(bestMove(board, turn))}>💡 Hint</button>
        <button className="act" aria-pressed={sound} onClick={() => setSound((s) => !s)}>{sound ? '🔊 Sound' : '🔇 Muted'}</button>
        <button className="act primary" onClick={() => reset({ starter: history.length ? other(starter) : starter })}>{over ? 'Next round' : 'Restart'}</button>
      </div>
    </div>
  )
}
