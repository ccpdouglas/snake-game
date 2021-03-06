import React, { useEffect } from "react"
import { SnakeSection, Fruit } from "../../types"

interface SquareProps {
    snakeSection?: SnakeSection
    fruit?: Fruit
    fruitSquareHit(fruit: Fruit): void
}

const Square = function ({ fruit, snakeSection, fruitSquareHit }: SquareProps) {
    const hasFruit = fruit !== undefined

    const createSnakeClass = function (snakeSection: SnakeSection | undefined) {
        if (!snakeSection) return ""
        return `SnakeSquare ${snakeSection.isHead ? "SnakeSquareHead" : ""}`
    }

    useEffect(() => {
        if (snakeSection?.isHead && fruit) fruitSquareHit(fruit)
    }, [fruit, fruitSquareHit, snakeSection])

    return (
        <span data-testid="Square" className={`Square ${hasFruit ? "FruitSquare" : ""} ${createSnakeClass(snakeSection)}`}></span>
    )
}

export default Square
