import { useState } from 'react'
import './App.css'

const WINNING_LINES = [
  [0, 1, 2], [3, 4, 5], [6, 7, 8],
  [0, 3, 6], [1, 4, 7], [2, 5, 8],
  [0, 4, 8], [2, 4, 6],
]

function calculateWinner(squares) {
  for (const [a, b, c] of WINNING_LINES) {
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return { winner: squares[a], line: [a, b, c] }
    }
  }
  return null
}

function App() {
  const [squares, setSquares] = useState(Array(9).fill(null))
  const [isXTurn, setIsXTurn] = useState(true)
  const [scores, setScores] = useState({ X: 0, O: 0, draws: 0 })
  const [gameOver, setGameOver] = useState(false)

  const result = calculateWinner(squares)
  const winner = result ? result.winner : null
  const winLine = result ? result.line : []
  const isDraw = !winner && squares.every(Boolean)

  const handleClick = (i) => {
    if (squares[i] || gameOver) return
    const next = squares.slice()
    next[i] = isXTurn ? 'X' : 'O'
    setSquares(next)

    const res = calculateWinner(next)
    if (res) {
      setScores((s) => ({ ...s, [res.winner]: s[res.winner] + 1 }))
      setGameOver(true)
    } else if (next.every(Boolean)) {
      setScores((s) => ({ ...s, draws: s.draws + 1 }))
      setGameOver(true)
    } else {
      setIsXTurn(!isXTurn)
    }
  }

  const restartRound = () => {
    setSquares(Array(9).fill(null))
    setIsXTurn(true)
    setGameOver(false)
  }

  const resetAll = () => {
    setSquares(Array(9).fill(null))
    setIsXTurn(true)
    setScores({ X: 0, O: 0, draws: 0 })
    setGameOver(false)
  }

  let statusText
  if (winner) {
    statusText = `Winner: ${winner}`
  } else if (isDraw) {
    statusText = "It's a Draw!"
  } else {
    statusText = `Turn: ${isXTurn ? 'X' : 'O'}`
  }

  return (
    <div className="page">
      <div className="card">
        <h1 className="title">Tic-Tac-Toe</h1>

        <div className="scoreboard">
          <span className="score-x">X: {scores.X}</span>
          <span className="score-draws">Draws: {scores.draws}</span>
          <span className="score-o">O: {scores.O}</span>
        </div>

        <p className="status">{statusText}</p>

        <div className="grid">
          {squares.map((val, i) => {
            const isWinCell = winLine.includes(i)
            return (
              <button
                key={i}
                className={`cell ${isWinCell ? 'win-cell' : ''} ${val === 'X' ? 'cell-x' : ''} ${val === 'O' ? 'cell-o' : ''}`}
                onClick={() => handleClick(i)}
              >
                {isWinCell ? <span className="win-text">{val}</span> : val}
              </button>
            )
          })}
        </div>

        <div className="btn-row">
          <button className="btn-primary" onClick={restartRound}>
            {gameOver ? 'Play Again' : 'Restart Round'}
          </button>
          <button className="btn-secondary" onClick={resetAll}>Reset All</button>
        </div>
      </div>
    </div>
  )
}

export default App
