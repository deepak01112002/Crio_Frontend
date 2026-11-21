import { useState } from 'react'
import './App.css'

function App() {
  const [item, setItem] = useState('')
  const [items, setItems] = useState([])

  const handleAdd = () => {
    if (!item.trim()) return
    setItems([...items, { id: Date.now(), text: item.trim() }])
    setItem('')
  }

  const handleRemove = (id) => {
    setItems(items.filter((i) => i.id !== id))
  }

  return (
    <div className="page">
      <div className="card">
        <h1 className="title">Add Items to List</h1>

        <div className="input-row">
          <input
            className="input"
            type="text"
            name="item"
            placeholder="Type something and press Enter"
            value={item}
            onChange={(e) => setItem(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleAdd()}
          />
          <button className="add-btn" onClick={handleAdd}>Add</button>
        </div>

        {items.length === 0 ? (
          <p className="empty-text">No items yet. Add your first one!</p>
        ) : (
          <ul className="list">
            {items.map((i) => (
              <li key={i.id} className="list-item">
                <span>{i.text}</span>
                <button className="remove-btn" onClick={() => handleRemove(i.id)}>Remove</button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  )
}

export default App
