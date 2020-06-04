import React, { useEffect, useRef, useState, useCallback } from "react"
import { Grid, useSnake } from "./components"
import { Direction, SnakePosition, GridPosition, Fruit } from "./types"

import "./App.css"

const gridSize = 15
const startingLength = 5
const startingPosition = { x: 5, y: 5, direction: Direction.down }

function randomIntFromInterval(min: number, max: number) {
    return Math.floor(Math.random() * (max - min + 1) + min)
}

const isOutOfBounds = function ({ x, y }: SnakePosition): boolean {
    if (x < 0 || y < 0) return true
    if (x > gridSize || y > gridSize) return true
    return false
}

const createFruitPosition = function (): GridPosition {
    const x = randomIntFromInterval(0, gridSize - 1)
    const y = randomIntFromInterval(0, gridSize - 1)
    return { x, y }
}

export default function () {
    const snakeMoveTO = useRef<any>()
    const [gameOver, setGameOver] = useState(false)
    const [fruitPosition, setFruitPosition] = useState(createFruitPosition())

    const { positions, headPosition, direction, snakeHitSelf, updateDirection, moveSnake, eatFruit } = useSnake({
        startingPosition,
        startingLength
    })

    const fruitSquareHit = useCallback(
        function (fruit: Fruit) {
            eatFruit(fruit)
            setFruitPosition(createFruitPosition())
        },
        [eatFruit]
    )

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
        if (isOutOfBounds(headPosition)) setGameOver(true)
        else snakeMoveTO.current = setTimeout(() => moveSnake(headPosition, direction), 150)
    }, [direction, headPosition, moveSnake])

    useEffect(() => {
        setGameOver(snakeHitSelf)
        if (snakeHitSelf) clearTimeout(snakeMoveTO.current)
    }, [snakeHitSelf])

    if (gameOver) return <span>game over</span>

    return (
        <div className="App">
            <Grid
                size={gridSize}
                headPosition={headPosition}
                positions={positions}
                fruitPosition={fruitPosition}
                fruitSquareHit={fruitSquareHit}
            />
        </div>
    )
}
