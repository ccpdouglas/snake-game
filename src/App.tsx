import React, { useEffect, useRef } from "react"
import { Grid, useSnake } from "./components"
import { Direction } from "./types"

import "./App.css"

export default function () {
    const snakeMoveTO = useRef<any>()

    const { positions, headPosition, updateDirection, moveSnake, direction } = useSnake({
        startingPosition: { x: 5, y: 5, direction: Direction.down },
        startingLength: 3
    })

    useEffect(() => {
        window.addEventListener("keyup", (e) => {
            if (e.key === "ArrowLeft") updateDirection(Direction.left)
            if (e.key === "ArrowUp") updateDirection(Direction.up)
            if (e.key === "ArrowRight") updateDirection(Direction.right)
            if (e.key === "ArrowDown") updateDirection(Direction.down)
        })
    }, [updateDirection])

    useEffect(() => {
        clearTimeout(snakeMoveTO.current)
        snakeMoveTO.current = setTimeout(() => moveSnake(headPosition, direction), 150)
    }, [direction, headPosition, moveSnake])

    return (
        <div className="App">
            <Grid size={15} headPosition={headPosition} positions={positions} />
        </div>
    )
}
