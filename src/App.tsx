import React, { useEffect, useRef, useState, useCallback } from "react"
import { Grid, useSnake } from "./components"
import { Direction, SnakePosition, GridPosition, Fruit } from "./types"

import "./App.css"
import GameOver from "./components/GameOver"

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

const createFruit = function (position: GridPosition): Fruit {
    return { ...position, value: randomIntFromInterval(1, 3) }
}

const App = function () {
    const snakeMoveTO = useRef<any>()
    const [gameOver, setGameOver] = useState(false)
    const [fruit, setFruit] = useState(createFruit(createFruitPosition()))
    const [score, setScore] = useState(0)

    const { positions, headPosition, direction, snakeHitSelf, updateDirection, moveSnake, eatFruit, resetSnake } = useSnake({
        startingPosition,
        startingLength
    })

    const restartGame = function () {
        resetSnake()
        setScore(0)
        setFruit(createFruit(createFruitPosition()))
        setGameOver(false)
    }

    const fruitSquareHit = useCallback(
        function (fruit: Fruit) {
            setScore((prev) => prev + fruit.value)
            eatFruit(fruit)
            setFruit(createFruit(createFruitPosition()))
        },
        [eatFruit]
    )

    useEffect(() => {
        const handleKeyUp = function ({ key }: KeyboardEvent) {
            switch (key) {
                case "ArrowLeft":
                    updateDirection(Direction.left)
                    break
                case "ArrowUp":
                    updateDirection(Direction.up)
                    break
                case "ArrowRight":
                    updateDirection(Direction.right)
                    break
                case "ArrowDown":
                    updateDirection(Direction.down)
                    break
            }
        }

        window.addEventListener("keyup", handleKeyUp)
        return () => window.removeEventListener("keyup", handleKeyUp)
    }, [updateDirection])

    useEffect(() => {
        clearTimeout(snakeMoveTO.current)
        if (isOutOfBounds(headPosition)) setGameOver(true)
        else snakeMoveTO.current = setTimeout(() => moveSnake(headPosition, direction), 75)
    }, [direction, headPosition, moveSnake])

    useEffect(() => {
        if (snakeHitSelf) {
            setGameOver(true)
            clearTimeout(snakeMoveTO.current)
        }
    }, [snakeHitSelf])

    return (
        <div className="App" style={{ width: `${gridSize * 30}px` }}>
            {!gameOver ? "" : <GameOver restartGame={restartGame} score={score} />}
            <Grid
                size={gridSize}
                headPosition={headPosition}
                positions={positions}
                fruit={fruit}
                fruitSquareHit={fruitSquareHit}
            />
        </div>
    )
}

export default App
