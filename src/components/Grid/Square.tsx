import React from "react"
import { GridPosition } from "../../types"

interface SquareProps {
    position: GridPosition
}

export default function ({ position }: SquareProps) {
    return <span className="Square"></span>
}
