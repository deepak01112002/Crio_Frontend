import { useState } from 'react'
import './App.css'

function App() {
  const [number, setNumber] = useState('')
  const [result, setResult] = useState(null)

  const handleCheck = () => {
    const trimmed = number.trim()

    if (trimmed === '' || isNaN(trimmed)) {
      setResult({ type: 'invalid', message: 'Not a valid number!' })
      return
    }

    const num = Number(trimmed)
    if (num % 2 === 0) {
      setResult({ type: 'even', message: `The number ${num} is even!` })
    } else {
      setResult({ type: 'odd', message: `Oops, ${num} is odd!` })
    }
  }

  return (
    <div className="page">
      <div className="card">
        <h1 className="title">Even or Odd Checker</h1>

        <input
          className="input"
          type="text"
          name="number"
          placeholder="Enter a number"
          value={number}
          onChange={(e) => setNumber(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleCheck()}
        />

        <button className="check-btn" onClick={handleCheck}>Check</button>

        {result && (
          <p className="result-text">{result.message}</p>
        )}
      </div>
    </div>
  )
}

export default App
