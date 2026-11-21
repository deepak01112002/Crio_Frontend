import { useState, useEffect } from 'react'
import './App.css'

const ALPHABETS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('')

function App() {
  const [text, setText] = useState('')

  const handleKey = (letter) => {
    setText((prev) => prev + letter)
  }

  const handleBackspace = () => {
    setText((prev) => prev.slice(0, -1))
  }

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Backspace') {
        handleBackspace()
      } else if (e.key.length === 1 && e.key.match(/[a-zA-Z]/)) {
        setText((prev) => prev + e.key.toUpperCase())
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [])

  return (
    <div className="page">
      <div className="card">
        <h1 className="title">Alphabet Buttons</h1>
        <p className="subtitle">Click letters (or use your keyboard) to build text.</p>

        <div className="output">
          {text || <span className="placeholder">Your text will appear here...</span>}
        </div>

        <div className="backspace-row">
          <button className="key backspace-btn" onClick={handleBackspace}>Backspace</button>
        </div>

        <div className="keys-grid">
          {ALPHABETS.map((letter) => (
            <button
              key={letter}
              className="key"
              onClick={() => handleKey(letter)}
            >
              {letter}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}

export default App
