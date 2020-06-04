import React from "react"
import { GridPosition, SnakeSection, Fruit } from "../../types"

interface SquareProps {
    position: GridPosition
    snakeSection?: SnakeSection
    fruit?: Fruit
}

export default function ({ position, fruit, snakeSection }: SquareProps) {
    const hasFruit = fruit !== undefined
    const hasSnake = snakeSection !== undefined

    return <span className={`Square ${hasFruit && "FruitSquare"} ${hasSnake && "SnakeSquare"}`}></span>
}
