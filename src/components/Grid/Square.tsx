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

    const createSnakeClass = function (snakeSection: SnakeSection | undefined) {
        if (!snakeSection) return ""
        return `SnakeSquare ${snakeSection.isHead ? "SnakeSquareHead" : ""}`
    }

    return <span className={`Square ${hasFruit && "FruitSquare"} ${createSnakeClass(snakeSection)}`}></span>
}
