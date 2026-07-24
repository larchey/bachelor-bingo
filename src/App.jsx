import { useState, useEffect } from 'react'
import LoginScreen from './components/LoginScreen'
import BingoCard from './components/BingoCard'
import RulesBanner from './components/RulesBanner'

const PLACEHOLDER_ITEMS = [
  'Brings up how many concussions he\'s had',
  'Gets squinty because he\'s stoned',
  'Eats cereal at an unreasonable hour',
  'Brings up RSVPing to his wedding',
  'Says something that could be misconstrued as somewhat racist',
  'Sings an early 2000s emo song for karaoke',
  'Quotes the movie Surf\'s Up',
  'Tries to kiss somebody',
  'Tries to go to bed early',
  'Brings up RuneScape',
  '',
  '',
  '',
  '',
  '',
  '',
  '',
  '',
  '',
  '',
  '',
  '',
  '',
  '',
]

function generateGrid(username) {
  const shuffled = [...PLACEHOLDER_ITEMS].sort(() => Math.random() - 0.5)
  const grid = shuffled.slice(0, 24)
  grid.splice(12, 0, 'FREE')
  return grid
}

function App() {
  const [username, setUsername] = useState('')
  const [grid, setGrid] = useState([])
  const [marked, setMarked] = useState(new Set())
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  useEffect(() => {
    const saved = localStorage.getItem('bingo_current_session')
    if (saved) {
      try {
        const { user, grid, marked } = JSON.parse(saved)
        setUsername(user)
        setGrid(grid)
        setMarked(new Set(marked))
        setIsLoggedIn(true)
      } catch (e) {
        console.error('Failed to restore session:', e)
      }
    }
  }, [])

  const handleLogin = (name) => {
    const sessionKey = `bingo_user_${name}`
    const saved = localStorage.getItem(sessionKey)

    let grid, marked
    if (saved) {
      try {
        const { grid: savedGrid, marked: savedMarked } = JSON.parse(saved)
        grid = savedGrid
        marked = new Set(savedMarked)
      } catch (e) {
        console.error('Failed to restore user session:', e)
        grid = generateGrid(name)
        marked = new Set([12])
      }
    } else {
      grid = generateGrid(name)
      marked = new Set([12])
    }

    setUsername(name)
    setGrid(grid)
    setMarked(marked)
    setIsLoggedIn(true)

    localStorage.setItem(sessionKey, JSON.stringify({
      grid,
      marked: Array.from(marked),
    }))
    localStorage.setItem('bingo_current_session', JSON.stringify({
      user: name,
      grid,
      marked: Array.from(marked),
    }))
  }

  const handleToggleCell = (index) => {
    if (index === 12) return
    const newMarked = new Set(marked)
    if (newMarked.has(index)) {
      newMarked.delete(index)
    } else {
      newMarked.add(index)
    }
    setMarked(newMarked)
    const sessionKey = `bingo_user_${username}`
    localStorage.setItem(sessionKey, JSON.stringify({
      grid,
      marked: Array.from(newMarked),
    }))
    localStorage.setItem('bingo_current_session', JSON.stringify({
      user: username,
      grid,
      marked: Array.from(newMarked),
    }))
  }

  const handleLogout = () => {
    localStorage.removeItem('bingo_current_session')
    setUsername('')
    setGrid([])
    setMarked(new Set())
    setIsLoggedIn(false)
  }

  const handleReset = () => {
    const newGrid = generateGrid(username)
    setGrid(newGrid)
    setMarked(new Set([12]))
    const sessionKey = `bingo_user_${username}`
    localStorage.setItem(sessionKey, JSON.stringify({
      grid: newGrid,
      marked: [12],
    }))
    localStorage.setItem('bingo_current_session', JSON.stringify({
      user: username,
      grid: newGrid,
      marked: [12],
    }))
  }

  return (
    <>
      <RulesBanner />
      <div className="container">
        {!isLoggedIn ? (
          <LoginScreen onLogin={handleLogin} />
        ) : (
          <BingoCard
            username={username}
            grid={grid}
            marked={marked}
            onToggleCell={handleToggleCell}
            onReset={handleReset}
            onLogout={handleLogout}
          />
        )}
      </div>
    </>
  )
}

export default App
