import { useState } from 'react'
import './App.css'

function validate(form) {
  const errors = {}

  if (!form.name.trim()) {
    errors.name = 'Name is required'
  }

  if (form.username && form.username !== form.username.toLowerCase()) {
    errors.username = 'Username must be lowercase only'
  }

  if (!form.college.trim()) {
    errors.college = 'College is required'
  }

  if (form.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
    errors.email = 'Enter a valid email address'
  }

  if (form.password && form.password.length < 8) {
    errors.password = 'Password must be at least 8 characters'
  }

  if (!form.address.trim()) {
    errors.address = 'Address is required'
  }

  return errors
}

export default function App() {
  const [form, setForm] = useState({
    name: '', username: '', college: '', email: '', password: '', address: ''
  })
  const [errors, setErrors] = useState({})
  const [submitted, setSubmitted] = useState(false)

  const handleChange = (e) => {
    const updated = { ...form, [e.target.name]: e.target.value }
    setForm(updated)
    if (submitted) {
      setErrors(validate(updated))
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setSubmitted(true)
    const errs = validate(form)
    setErrors(errs)
    if (Object.keys(errs).length === 0) {
      alert('Registration successful!')
    }
  }

  return (
    <div className="page">
      <div className="card">
        <h1 className="title">Student Registration Form</h1>

        <form className="form" onSubmit={handleSubmit} noValidate>
          <div className="field">
            <label className="label">Name</label>
            <input
              className={`input ${errors.name ? 'input-error' : ''}`}
              type="text"
              name="name"
              placeholder="Enter name"
              value={form.name}
              onChange={handleChange}
            />
            {errors.name && <p className="error-msg">{errors.name}</p>}
          </div>

          <div className="field">
            <label className="label">Username</label>
            <input
              className={`input ${errors.username ? 'input-error' : ''}`}
              type="text"
              name="username"
              placeholder="Enter username"
              value={form.username}
              onChange={handleChange}
            />
            {errors.username && <p className="error-msg">{errors.username}</p>}
          </div>

          <div className="field">
            <label className="label">College</label>
            <input
              className={`input ${errors.college ? 'input-error' : ''}`}
              type="text"
              name="college"
              placeholder="Enter college"
              value={form.college}
              onChange={handleChange}
            />
            {errors.college && <p className="error-msg">{errors.college}</p>}
          </div>

          <div className="field">
            <label className="label">Email</label>
            <input
              className={`input ${errors.email ? 'input-error' : ''}`}
              type="email"
              name="email"
              placeholder="Enter email"
              value={form.email}
              onChange={handleChange}
            />
            {errors.email && <p className="error-msg">{errors.email}</p>}
          </div>

          <div className="field">
            <label className="label">Password</label>
            <input
              className={`input ${errors.password ? 'input-error' : ''}`}
              type="password"
              name="password"
              placeholder="Enter password"
              value={form.password}
              onChange={handleChange}
            />
            {errors.password && <p className="error-msg">{errors.password}</p>}
          </div>

          <div className="field">
            <label className="label">Address</label>
            <input
              className={`input ${errors.address ? 'input-error' : ''}`}
              type="text"
              name="address"
              placeholder="Enter address"
              value={form.address}
              onChange={handleChange}
            />
            {errors.address && <p className="error-msg">{errors.address}</p>}
          </div>

          <button type="submit" className="register-btn">Register</button>
        </form>
      </div>
    </div>
  )
}
