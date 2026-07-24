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
  )
}
