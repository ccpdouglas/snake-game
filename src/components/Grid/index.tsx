import React from "react"
import Square from "./Square"

import "./Grid.css"

interface GridProps {
    size: number
}

interface GridRowProps {
    width: number
    row: number
}

const GridRow = function ({ width, row }: GridRowProps) {
    const isOdd = row % 2 !== 0
    const className = isOdd ? "OddRow" : "EvenRow"
    const squares = [...new Array(width)].map((_: undefined, index: number) => <Square position={{ x: index, y: row }} />)

    return <div className={`Row ${className}`}>{squares}</div>
}

export default function ({ size }: GridProps) {
    const rows = [...new Array(size)].map((_: undefined, index: number) => <GridRow row={index} width={size} />)

    return <div className="Grid">{rows}</div>
}
