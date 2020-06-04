import React from "react"

import "./index.css"

interface GameOverProps {
    restartGame(): void
}

const GameOver = function ({ restartGame }: GameOverProps) {
    return (
        <div className="GameOver">
            <h4>Game Over</h4>
            <p onClick={restartGame}>Restart</p>
        </div>
    )
}

export default GameOver
