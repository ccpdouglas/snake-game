import React from "react"
import { SnakePosition, Fruit } from "../../types"

import "./index.css"
import GridRow from "./GridRow"

interface GridProps {
    size: number
    headPosition: SnakePosition
    positions: SnakePosition[]
    fruit: Fruit
    fruitSquareHit(fruit: Fruit): void
}

const Grid = function ({ size, headPosition, positions, fruit, fruitSquareHit }: GridProps) {
    const rows = [...new Array(size)].map((_: undefined, index: number) => (
        <GridRow
            key={index}
            row={index}
            width={size}
            headPosition={headPosition}
            snakePositions={positions}
            fruitSquareHit={fruitSquareHit}
            fruit={fruit}
        />
    ))

    return <div className="Grid">{rows}</div>
}

export default Grid
