export default function BingoCard({
  username,
  grid,
  marked,
  onToggleCell,
  onReset,
  onLogout,
}) {
  return (
    <div className="bingo-container">
      <div className="bingo-header">
        <h1>🎲 {username}'s Bingo</h1>
        <p>{marked.size - 1} / 24 marked</p>
        <button className="logout-btn" onClick={onLogout}>Switch Player</button>
      </div>

      <div className="bingo-grid">
        {grid.map((item, index) => (
          <div
            key={index}
            className={`bingo-cell ${marked.has(index) ? 'marked' : ''} ${index === 12 ? 'free' : ''}`}
            onClick={() => onToggleCell(index)}
            style={index === 12 ? { cursor: 'default' } : {}}
          >
            {item}
          </div>
        ))}
      </div>

      <button className="reset-btn" onClick={onReset}>New Card</button>
    </div>
  )
}
