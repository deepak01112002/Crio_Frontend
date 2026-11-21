import { useState } from 'react'
import './App.css'

const EMPTY_BOARD = () => Array(9).fill(null).map(() => Array(9).fill(''))

function validateBoard(board) {
  const conflicts = new Set()

  const key = (r, c) => `${r}-${c}`

  // Check rows
  for (let r = 0; r < 9; r++) {
    const seen = {}
    for (let c = 0; c < 9; c++) {
      const val = board[r][c]
      if (!val) continue
      if (seen[val] !== undefined) {
        conflicts.add(key(r, c))
        conflicts.add(key(r, seen[val]))
      } else {
        seen[val] = c
      }
    }
  }

  // Check columns
  for (let c = 0; c < 9; c++) {
    const seen = {}
    for (let r = 0; r < 9; r++) {
      const val = board[r][c]
      if (!val) continue
      if (seen[val] !== undefined) {
        conflicts.add(key(r, c))
        conflicts.add(key(seen[val], c))
      } else {
        seen[val] = r
      }
    }
  }

  // Check 3×3 boxes
  for (let boxRow = 0; boxRow < 3; boxRow++) {
    for (let boxCol = 0; boxCol < 3; boxCol++) {
      const seen = {}
      for (let r = 0; r < 3; r++) {
        for (let c = 0; c < 3; c++) {
          const gr = boxRow * 3 + r
          const gc = boxCol * 3 + c
          const val = board[gr][gc]
          if (!val) continue
          const k = `${gr}-${gc}`
          if (seen[val] !== undefined) {
            conflicts.add(k)
            conflicts.add(seen[val])
          } else {
            seen[val] = k
          }
        }
      }
    }
  }

  return conflicts
}

function App() {
  const [board, setBoard] = useState(EMPTY_BOARD())
  const [conflicts, setConflicts] = useState(new Set())
  const [result, setResult] = useState(null)

  const handleChange = (r, c, val) => {
    if (val !== '' && (!/^[1-9]$/.test(val))) return
    const next = board.map((row) => [...row])
    next[r][c] = val
    setBoard(next)
    setConflicts(new Set())
    setResult(null)
  }

  const handleValidate = () => {
    const found = validateBoard(board)
    setConflicts(found)
    setResult(found.size === 0 ? 'valid' : 'invalid')
  }

  const handleClear = () => {
    setBoard(EMPTY_BOARD())
    setConflicts(new Set())
    setResult(null)
  }

  return (
    <div className="page">
      <div className="card">
        <h1 className="title">Sudoku Validator</h1>
        <p className="subtitle">Enter numbers 1-9 and validate the board.</p>

        <div className="board">
          {board.map((row, r) =>
            row.map((val, c) => {
              const isConflict = conflicts.has(`${r}-${c}`)
              return (
                <input
                  key={`${r}-${c}`}
                  className={`cell ${isConflict ? 'cell-conflict' : ''}`}
                  type="text"
                  maxLength={1}
                  value={val}
                  onChange={(e) => handleChange(r, c, e.target.value)}
                />
              )
            })
          )}
        </div>

        <div className="btn-row">
          <button className="btn-validate" onClick={handleValidate}>Validate</button>
          <button className="btn-clear" onClick={handleClear}>Clear</button>
        </div>

        {result === 'valid' && (
          <p className="msg-valid">✅ Sudoku is valid so far!</p>
        )}
        {result === 'invalid' && (
          <p className="msg-invalid">✗ Invalid Sudoku! Conflicts found.</p>
        )}
      </div>
    </div>
  )
}

export default App
