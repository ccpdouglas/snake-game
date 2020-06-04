import React, { useEffect, useRef, useState } from "react"
import { Grid, useSnake } from "./components"
import { Direction, SnakePosition } from "./types"

import "./App.css"

const gridSize = 10
const startingLength = 3
const startingPosition = { x: 5, y: 5, direction: Direction.down }

const isOutOfBounds = function ({ x, y }: SnakePosition): boolean {
    if (x < 0 || y < 0) return true
    if (x > gridSize || y > gridSize) return true
    return false
}

export default function () {
    const snakeMoveTO = useRef<any>()
    const [gameOver, setGameOver] = useState(false)

    const { positions, headPosition, updateDirection, moveSnake, direction } = useSnake({ startingPosition, startingLength })

    useEffect(() => {
        window.addEventListener("keyup", (e) => {
            if (e.key === "ArrowLeft") updateDirection(Direction.left)
            if (e.key === "ArrowUp") updateDirection(Direction.up)
            if (e.key === "ArrowRight") updateDirection(Direction.right)
            if (e.key === "ArrowDown") updateDirection(Direction.down)
        })
    }, [updateDirection])

    useEffect(() => {
        clearTimeout(snakeMoveTO.current)
        const isGameOver = isOutOfBounds(headPosition)
        if (isGameOver) setGameOver(isGameOver)
        else snakeMoveTO.current = setTimeout(() => moveSnake(headPosition, direction), 150)
    }, [direction, headPosition, moveSnake])

    if (gameOver) return <span>game over</span>

    return (
        <div className="App">
            <Grid size={gridSize} headPosition={headPosition} positions={positions} />
        </div>
    )
}
