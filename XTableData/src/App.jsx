import { useState } from 'react'
import './App.css'

function App() {
  const [form, setForm] = useState({ place: '', name: '', age: '' })
  const [rows, setRows] = useState([])

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleAdd = () => {
    if (!form.place || !form.name || !form.age) return
    setRows([...rows, { ...form, id: Date.now() }])
    setForm({ place: '', name: '', age: '' })
  }

  const handleClear = () => {
    setForm({ place: '', name: '', age: '' })
  }

  const handleRemove = (id) => {
    setRows(rows.filter((r) => r.id !== id))
  }

  return (
    <div className="page">
      <div className="card">
        <h1 className="title">Add People to Table</h1>
        <p className="subtitle">Enter Place, Name, and Age, then click Add.</p>

        <div className="form-row">
          <div className="field">
            <label className="label">Place</label>
            <input
              className="input"
              type="text"
              name="place"
              placeholder="e.g. Mumbai"
              value={form.place}
              onChange={handleChange}
            />
          </div>
          <div className="field">
            <label className="label">Name</label>
            <input
              className="input"
              type="text"
              name="name"
              placeholder="e.g. Akash"
              value={form.name}
              onChange={handleChange}
            />
          </div>
          <div className="field">
            <label className="label">Age</label>
            <input
              className="input"
              type="text"
              name="age"
              placeholder="e.g. 24"
              value={form.age}
              onChange={handleChange}
            />
          </div>
        </div>

        <div className="btn-row">
          <button className="add-btn" onClick={handleAdd}>Add</button>
          <button className="clear-btn" onClick={handleClear}>Clear</button>
        </div>

        {rows.length === 0 ? (
          <div className="empty-box">
            <p className="empty-text">No entries yet. Add your first row!</p>
          </div>
        ) : (
          <table className="table">
            <thead>
              <tr>
                <th>Place</th>
                <th>Name</th>
                <th>Age</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {rows.map((r) => (
                <tr key={r.id}>
                  <td>{r.place}</td>
                  <td>{r.name}</td>
                  <td>{r.age}</td>
                  <td>
                    <button className="remove-btn" onClick={() => handleRemove(r.id)}>
                      Remove
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  )
}

export default App
