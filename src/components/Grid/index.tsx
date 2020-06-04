import React from "react"
import { SnakePosition, Fruit } from "../../types"
import GridRow from "../GridRow"

import "./index.css"

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
