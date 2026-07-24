import { useState } from 'react'

export default function LoginScreen({ onLogin }) {
  const [name, setName] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    if (name.trim()) {
      onLogin(name.trim())
    }
  }

  return (
    <div style={{ width: '100%', maxWidth: '500px' }}>
      <div className="rules-box">
        <h2>📋 The Rules</h2>
        <ol>
          <li><strong>Don't tell Andy.</strong></li>
          <li><strong>No direct questions.</strong> Don't ask Andy about bingo items. Tangential questions to start moving towards the topic are allowed.</li>
          <li><strong>Winner gets $100 worth of scratchers.</strong></li>
        </ol>
      </div>
      <form className="login-screen" onSubmit={handleSubmit}>
        <h1>🎉 Secret Bingo</h1>
        <p style={{ marginBottom: '20px', color: '#aaa' }}>Enter your name to start playing</p>
        <input
          type="text"
          placeholder="Your name..."
          value={name}
          onChange={(e) => setName(e.target.value)}
          autoFocus
        />
        <br />
        <button type="submit">Play</button>
      </form>
    </div>
  )
}
