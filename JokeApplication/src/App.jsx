import { useState } from 'react'
import './App.css'

function App() {
  const [joke, setJoke] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const fetchJoke = async () => {
    setLoading(true)
    setError(null)
    setJoke(null)

    try {
      const response = await fetch('https://official-joke-api.appspot.com/random_joke')
      if (!response.ok) {
        throw new Error('Failed to fetch joke')
      }
      const data = await response.json()
      setJoke(data)
    } catch (err) {
      setError('Could not fetch a joke. Try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="page">
      <div className="card">
        <h1 className="title">Random Joke</h1>
        <p className="subtitle">Click the button to fetch a fresh one.</p>

        <button
          className="fetch-btn"
          onClick={fetchJoke}
          disabled={loading}
        >
          {loading ? 'Fetching…' : 'Fetch joke'}
        </button>

        {joke && (
          <div className="joke">
            <p className="joke-setup">{joke.setup}</p>
            <p className="joke-punchline">{joke.punchline}</p>
          </div>
        )}

        {error && (
          <div className="error-block">
            <p className="error-text">{error}</p>
            <button className="try-again" onClick={fetchJoke}>Try again</button>
          </div>
        )}
      </div>
    </div>
  )
}

export default App
