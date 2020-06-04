import React from "react"
import { SnakePosition, GridPosition, Fruit } from "../../types"

import "./Grid.css"
import GridRow from "./GridRow"

interface GridProps {
    size: number
    headPosition: SnakePosition
    positions: SnakePosition[]
    fruitPosition: GridPosition
    fruitSquareHit(fruit: Fruit): void
}

const Grid = function ({ size, headPosition, positions, fruitPosition, fruitSquareHit }: GridProps) {
    const rows = [...new Array(size)].map((_: undefined, index: number) => (
        <GridRow
            key={index}
            row={index}
            width={size}
            headPosition={headPosition}
            snakePositions={positions}
            fruitSquareHit={fruitSquareHit}
            fruitPosition={fruitPosition}
        />
    ))

    return <div className="Grid">{rows}</div>
}

export default Grid
