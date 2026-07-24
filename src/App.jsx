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
  'Tells a joke',
  'Buys a round',
  'Dances alone',
  'Loses his shoe',
  'Tries to go to bed early',
  'Spills a drink',
  'Falls down',
  'Tries to kiss somebody',
  'Gets a tattoo',
  'Loses his phone',
  'Cries',
  'Breaks something',
  'Makes a scene',
  'Passes out',
  'Gets rejected',
  'Pukes',
  'Does something stupid on the dance floor',
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
    const saved = localStorage.getItem('bingo_session')
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
    const newGrid = generateGrid(name)
    setUsername(name)
    setGrid(newGrid)
    setMarked(new Set([12]))
    setIsLoggedIn(true)
    localStorage.setItem('bingo_session', JSON.stringify({
      user: name,
      grid: newGrid,
      marked: [12],
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
    localStorage.setItem('bingo_session', JSON.stringify({
      user: username,
      grid,
      marked: Array.from(newMarked),
    }))
  }

  const handleLogout = () => {
    localStorage.removeItem('bingo_session')
    setUsername('')
    setGrid([])
    setMarked(new Set())
    setIsLoggedIn(false)
  }

  const handleReset = () => {
    const newGrid = generateGrid(username)
    setGrid(newGrid)
    setMarked(new Set([12]))
    localStorage.setItem('bingo_session', JSON.stringify({
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
