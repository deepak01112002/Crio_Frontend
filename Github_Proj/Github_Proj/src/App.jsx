import { useState } from 'react'
import './App.css'

function App() {
  const [username, setUsername] = useState('')
  const [user, setUser] = useState(null)
  const [error, setError] = useState(null)
  const [validationError, setValidationError] = useState(null)

  const handleSearch = async () => {
    if (!username.trim()) {
      setValidationError('Please enter a GitHub username.')
      setUser(null)
      setError(null)
      return
    }

    setValidationError(null)
    setError(null)
    setUser(null)

    try {
      const response = await fetch(`https://api.github.com/users/${username.trim()}`)
      if (!response.ok) {
        throw new Error('User not found')
      }
      const data = await response.json()
      setUser(data)
    } catch (err) {
      setError('User not found. Please try again.')
    }
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') handleSearch()
  }

  return (
    <div className="page">
      <div className="card">
        <h1 className="title">GitHub User Finder</h1>
        <p className="subtitle">Search a GitHub username to see profile details.</p>

        <div className="search-row">
          <input
            className="search-input"
            type="text"
            name="username"
            placeholder="e.g. torvalds, gaearon, octocat"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            onKeyDown={handleKeyDown}
          />
          <button className="search-btn" onClick={handleSearch}>Search</button>
        </div>

        {validationError && (
          <div className="validation-error">
            <p>{validationError}</p>
          </div>
        )}

        {error && (
          <p className="error-text">{error}</p>
        )}

        {!user && !validationError && !error && (
          <p className="hint-text">No user yet. Try searching for "octocat".</p>
        )}

        {user && (
          <div className="profile">
            <img className="avatar" src={user.avatar_url} alt={user.login} />
            <div className="profile-info">
              <div className="profile-name-row">
                <span className="profile-name">{user.name || user.login}</span>
                <span className="profile-login">@{user.login}</span>
              </div>
              <div className="profile-stats">
                <span><strong>{user.public_repos}</strong> Repos</span>
                <span className="divider">|</span>
                <span><strong>{user.followers}</strong> Followers</span>
                <span className="divider">|</span>
                <span><strong>{user.following}</strong> Following</span>
              </div>
              <div className="profile-meta">
                {user.location && (
                  <span>📍 {user.location}</span>
                )}
                {user.company && (
                  <span>🗂 {user.company}</span>
                )}
                {user.blog && (
                  <a href={user.blog} target="_blank" rel="noreferrer">🔗 {user.blog}</a>
                )}
                <a href={user.html_url} target="_blank" rel="noreferrer">🔖 View on GitHub</a>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default App
