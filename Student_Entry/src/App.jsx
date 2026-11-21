import { useState } from 'react'
import './App.css'

function App() {
  const [form, setForm] = useState({ name: '', age: '', grade: '' })
  const [students, setStudents] = useState([])

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleAdd = () => {
    if (!form.name || !form.age || !form.grade) return
    setStudents([...students, { ...form, id: Date.now() }])
    setForm({ name: '', age: '', grade: '' })
  }

  const handleClear = () => {
    setForm({ name: '', age: '', grade: '' })
  }

  const handleRemove = (id) => {
    setStudents(students.filter((s) => s.id !== id))
  }

  return (
    <div className="page">
      <div className="card">
        <h1 className="title">Student Entry Form</h1>
        <p className="subtitle">Add students and review the list below.</p>

        <div className="form-row">
          <div className="field">
            <label className="label">Name</label>
            <input
              className="input"
              type="text"
              name="name"
              placeholder="e.g. MS Dhoni"
              value={form.name}
              onChange={handleChange}
            />
          </div>
          <div className="field">
            <label className="label">Age</label>
            <input
              className="input"
              type="number"
              name="age"
              placeholder="e.g. 14"
              value={form.age}
              onChange={handleChange}
            />
          </div>
          <div className="field">
            <label className="label grade-label">Grade</label>
            <select
              className="input select"
              name="grade"
              value={form.grade}
              onChange={handleChange}
            >
              <option value="">Select grade</option>
              <option value="Class 1">Class 1</option>
              <option value="Class 2">Class 2</option>
              <option value="Class 3">Class 3</option>
              <option value="Class 4">Class 4</option>
              <option value="Class 5">Class 5</option>
              <option value="Class 6">Class 6</option>
              <option value="Class 7">Class 7</option>
              <option value="Class 8">Class 8</option>
              <option value="Class 9">Class 9</option>
              <option value="Class 10">Class 10</option>
            </select>
          </div>
        </div>

        <div className="btn-row">
          <button className="btn-add" onClick={handleAdd}>Add Student</button>
          <button className="btn-clear" onClick={handleClear}>Clear</button>
        </div>

        {students.length === 0 ? (
          <div className="empty-box">
            <p className="empty-text">No students added yet.</p>
          </div>
        ) : (
          <table className="table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Age</th>
                <th>Grade</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {students.map((s) => (
                <tr key={s.id}>
                  <td>{s.name}</td>
                  <td>{s.age}</td>
                  <td>{s.grade}</td>
                  <td>
                    <button className="btn-remove" onClick={() => handleRemove(s.id)}>
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
