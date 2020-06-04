import React from "react"

import "./index.css"

interface GameOverProps {
    score: number
    restartGame(): void
}

const GameOver = function ({ score, restartGame }: GameOverProps) {
    return (
        <div className="GameOver">
            <span>Score: {score}</span>
            <h4>Game Over</h4>
            <p onClick={restartGame}>Restart</p>
        </div>
    )
}

export default GameOver
