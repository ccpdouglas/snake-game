import React from "react"
import { SnakePosition, GridPosition, Fruit, SnakeSection } from "../../types"
import Square from "../Square"

interface GridRowProps {
    width: number
    row: number
    headPosition: SnakePosition
    snakePositions: SnakePosition[]
    fruit: Fruit
    fruitSquareHit(fruit: Fruit): void
}

const findSnakePositionIndexByGridPosition = (squarePosition: GridPosition, snakePositions: SnakePosition[]): number => {
    return snakePositions.findIndex(({ x, y }) => {
        return x === squarePosition.x && y === squarePosition.y
    })
}

const createSnakeSection = function (snakePositions: SnakePosition[], index: number): SnakeSection {
    return { direction: snakePositions[index].direction, isHead: index === snakePositions.length - 1 }
}

const GridRow = function ({ width, row, snakePositions, fruit, fruitSquareHit }: GridRowProps) {
    const isOdd = row % 2 !== 0
    const className = isOdd ? "OddRow" : "EvenRow"

    const squares = [...new Array(width)].map((_: undefined, index: number) => {
        const position = { x: index, y: row }
        const hasFruit = fruit.x === position.x && fruit.y === position.y
        const snakePositionIndex = findSnakePositionIndexByGridPosition(position, snakePositions)
        const snakeSection = snakePositionIndex > -1 ? createSnakeSection(snakePositions, snakePositionIndex) : undefined

        return (
            <Square
                key={index}
                snakeSection={snakeSection}
                fruit={hasFruit ? fruit : undefined}
                fruitSquareHit={fruitSquareHit}
            />
        )
    })

    return <div className={`Row ${className}`}>{squares}</div>
}

export default GridRow
