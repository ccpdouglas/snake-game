import React from "react"
import Square from "./Square"

import "./Grid.css"
import { SnakePosition, SnakeSection, GridPosition } from "../../types"

interface GridProps {
    size: number
    headPosition: SnakePosition
    positions: SnakePosition[]
}

interface GridRowProps {
    width: number
    row: number
    headPosition: SnakePosition
    snakePositions: SnakePosition[]
}

const findSnakePositionIndexByGridPosition = (squarePosition: GridPosition, snakePositions: SnakePosition[]): number => {
    return snakePositions.findIndex(({ x, y }) => {
        return x === squarePosition.x && y === squarePosition.y
    })
}

const createSnakeSection = function (snakePositions: SnakePosition[], index: number): SnakeSection {
    return { direction: snakePositions[index].direction, isHead: index === snakePositions.length - 1 }
}

const GridRow = function ({ width, row, snakePositions }: GridRowProps) {
    const isOdd = row % 2 !== 0
    const className = isOdd ? "OddRow" : "EvenRow"

    const squares = [...new Array(width)].map((_: undefined, index: number) => {
        const position = { x: index, y: row }
        const snakePositionIndex = findSnakePositionIndexByGridPosition(position, snakePositions)
        const snakeSection = snakePositionIndex > -1 ? createSnakeSection(snakePositions, snakePositionIndex) : undefined

        return <Square key={index} position={position} snakeSection={snakeSection} />
    })

    return <div className={`Row ${className}`}>{squares}</div>
}

export default function ({ size, headPosition, positions }: GridProps) {
    const rows = [...new Array(size)].map((_: undefined, index: number) => (
        <GridRow key={index} row={index} width={size} headPosition={headPosition} snakePositions={positions} />
    ))

    return <div className="Grid">{rows}</div>
}
