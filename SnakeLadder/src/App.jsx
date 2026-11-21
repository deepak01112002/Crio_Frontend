import { useState } from 'react'
import './App.css'

// Snakes: head -> tail
const SNAKES = {
  99: 54, 70: 55, 52: 42, 25: 2, 95: 73, 61: 18, 87: 36, 17: 7
}

// Ladders: bottom -> top
const LADDERS = {
  4: 25, 13: 46, 33: 49, 42: 63, 50: 69, 62: 81, 74: 92, 9: 31
}

function buildBoard() {
  // Board is 10x10, row 0 = top (cells 100..91), row 9 = bottom (cells 1..10)
  const rows = []
  for (let r = 0; r < 10; r++) {
    const row = []
    const base = 100 - r * 10
    for (let c = 0; c < 10; c++) {
      // Even rows (0,2,...) go right-to-left: 100,99,...91 then 81,82,...
      // Odd rows go left-to-right
      const cell = r % 2 === 0 ? base - c : base - 9 + c
      row.push(cell)
    }
    rows.push(row)
  }
  return rows
}

const BOARD = buildBoard()

export default function App() {
  const [positions, setPositions] = useState([0, 0]) // 0 = not started
  const [turn, setTurn] = useState(0) // 0 = P1, 1 = P2
  const [lastDice, setLastDice] = useState(null)
  const [winner, setWinner] = useState(null)
  const [log, setLog] = useState('')

  const rollDice = () => {
    if (winner !== null) return
    const dice = Math.floor(Math.random() * 6) + 1
    setLastDice(dice)

    const newPos = [...positions]
    let pos = newPos[turn] + dice

    if (pos > 100) {
      // Can't move — need exact 100
      setLog(`P${turn + 1} rolled ${dice}. Needs exact 100 to win!`)
      setTurn(1 - turn)
      return
    }

    let msg = `P${turn + 1} rolled ${dice} → ${pos}`

    if (SNAKES[pos]) {
      msg += ` 🐍 Snake! Slides down to ${SNAKES[pos]}`
      pos = SNAKES[pos]
    } else if (LADDERS[pos]) {
      msg += ` 🪜 Ladder! Climbs up to ${LADDERS[pos]}`
      pos = LADDERS[pos]
    }

    newPos[turn] = pos
    setPositions(newPos)

    if (pos === 100) {
      setWinner(turn)
      setLog(`P${turn + 1} wins! 🏆`)
    } else {
      setLog(msg)
      setTurn(1 - turn)
    }
  }

  const reset = () => {
    setPositions([0, 0])
    setTurn(0)
    setLastDice(null)
    setWinner(null)
    setLog('')
  }

  return (
    <div className="page">
      <div className="card">
        <h1 className="title">Snake & Ladders</h1>

        <div className="top-bar">
          <div className="turn-info">
            {winner !== null ? (
              <>
                <span className="winner-badge p1-color">🏆 Player {winner + 1} wins!</span>
                <span className="loser-badge p2-color">Player {2 - winner} loses</span>
              </>
            ) : (
              <span className="turn-label">
                Turn: <span className={`turn-badge ${turn === 0 ? 'p1-color' : 'p2-color'}`}>P{turn + 1}</span>
              </span>
            )}
          </div>
          <div className="legend">
            <span className="legend-dot p1-dot">●</span> P1
            <span className="legend-dot p2-dot">●</span> P2
          </div>
        </div>

        <div className="board-wrap">
          <table className="board-table">
            <tbody>
              {BOARD.map((row, ri) => (
                <tr key={ri}>
                  {row.map((cell) => {
                    const hasP1 = positions[0] === cell
                    const hasP2 = positions[1] === cell
                    const isSnakeHead = SNAKES[cell] !== undefined
                    const isLadderBottom = LADDERS[cell] !== undefined
                    return (
                      <td
                        key={cell}
                        className={`board-cell ${isSnakeHead ? 'snake-cell' : ''} ${isLadderBottom ? 'ladder-cell' : ''}`}
                      >
                        <span className="cell-num">{cell}</span>
                        {isSnakeHead && <span className="cell-tag snake-tag">↓{SNAKES[cell]}</span>}
                        {isLadderBottom && <span className="cell-tag ladder-tag">↑{LADDERS[cell]}</span>}
                        <div className="cell-players">
                          {hasP1 && <span className="player-dot p1-dot">P1</span>}
                          {hasP2 && <span className="player-dot p2-dot">P2</span>}
                        </div>
                      </td>
                    )
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="positions-row">
          <span className="pos-badge p1-bg">P1: {positions[0]}</span>
          <span className="pos-badge p2-bg">P2: {positions[1]}</span>
        </div>

        <div className="btn-row">
          <button className="btn-roll" onClick={rollDice} disabled={winner !== null}>
            🎲 Roll Dice{lastDice ? ` (${lastDice})` : ''}
          </button>
          <button className="btn-reset" onClick={reset}>Reset</button>
        </div>

        {log && <p className="log-text">{log}</p>}

        <p className="footer-text">
          Exact 100 is required to win. Land on a <strong>ladder</strong> to climb up, a <strong>snake</strong> to slide down.
        </p>
      </div>
    </div>
  )
}
