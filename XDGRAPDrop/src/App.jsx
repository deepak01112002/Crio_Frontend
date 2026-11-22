import { useState, useRef } from 'react'
import './App.css'

const INITIAL_DIGITS = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]

export default function App() {
  const [digits, setDigits] = useState(INITIAL_DIGITS)
  const [draggingIdx, setDraggingIdx] = useState(null)
  const [overIdx, setOverIdx] = useState(null)
  const dragItem = useRef(null)

  const handleDragStart = (idx) => {
    dragItem.current = idx
    setDraggingIdx(idx)
  }

  const handleDragEnter = (idx) => {
    setOverIdx(idx)
  }

  const handleDragOver = (e) => {
    e.preventDefault()
  }

  const handleDrop = (idx) => {
    const from = dragItem.current
    if (from === idx) {
      setDraggingIdx(null)
      setOverIdx(null)
      return
    }
    const next = [...digits]
    const [removed] = next.splice(from, 1)
    next.splice(idx, 0, removed)
    setDigits(next)
    setDraggingIdx(null)
    setOverIdx(null)
    dragItem.current = null
  }

  const handleDragEnd = () => {
    setDraggingIdx(null)
    setOverIdx(null)
    dragItem.current = null
  }

  return (
    <div className="page">
      <div className="card">
        <h1 className="title">Drag & Drop Digits</h1>
        <p className="subtitle">Drag the boxes to reorder the digits 0–9.</p>

        <div className="grid">
          {digits.map((digit, idx) => (
            <div
              key={digit}
              className={`digit-box
                ${draggingIdx === idx ? 'dragging' : ''}
                ${overIdx === idx && draggingIdx !== idx ? 'over' : ''}
              `}
              draggable
              onDragStart={() => handleDragStart(idx)}
              onDragEnter={() => handleDragEnter(idx)}
              onDragOver={handleDragOver}
              onDrop={() => handleDrop(idx)}
              onDragEnd={handleDragEnd}
            >
              {draggingIdx === idx && (
                <span className="ghost-num">{digit}</span>
              )}
              <span className="digit-num">{digit}</span>
            </div>
          ))}
        </div>

        <p className="tip-text">
          Tip: Try reordering to make{' '}
          <code className="tip-code">0123456789</code> or reverse it!
        </p>
      </div>
    </div>
  )
}
