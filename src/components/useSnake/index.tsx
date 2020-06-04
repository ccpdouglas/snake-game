import { useState } from "react"
import { Direction, SnakePosition, Fruit } from "../../types"

interface UseSnakeProps {
    startingPosition: SnakePosition
    startingLength: number
}

interface SnakeContext {
    positions: SnakePosition[]
    headPosition: SnakePosition
    eatFruit(fruid: Fruit): void
    updateDirection(direction: Direction): void
    moveSnake(): void
}

const createNewPositionBehind = function (position: SnakePosition): SnakePosition {
    switch (position.direction) {
        case Direction.down:
            return { ...position, y: position.y + 1 }
        case Direction.up:
            return { ...position, y: position.y - 1 }
        case Direction.right:
            return { ...position, y: position.x - 1 }
        case Direction.left:
            return { ...position, y: position.x + 1 }
    }
}

const createNewPositionForward = function (position: SnakePosition, direction: Direction): SnakePosition {
    switch (direction) {
        case Direction.down:
            return { ...position, direction, y: position.y - 1 }
        case Direction.up:
            return { ...position, direction, y: position.y + 1 }
        case Direction.right:
            return { ...position, direction, x: position.x + 1 }
        case Direction.left:
            return { ...position, direction, x: position.x - 1 }
    }
}

const increaseSnakeLength = function (oldPositions: SnakePosition[], newTail: SnakePosition): SnakePosition[] {
    return [newTail, ...oldPositions]
}

const createPositions = function (oldPositions: SnakePosition[], newPosition: SnakePosition): SnakePosition[] {
    return [...oldPositions.slice(1), newPosition]
}

export default function ({ startingPosition }: UseSnakeProps): SnakeContext {
    const [direction, setDirection] = useState(startingPosition.direction)
    const [positions, setPositions] = useState([startingPosition])

    const headPosition = positions[positions.length - 1]

    const eatFruit = function (fruit: Fruit): void {
        setPositions((prev) => increaseSnakeLength(prev, createNewPositionBehind(prev[0])))
    }

    const updateDirection = function (direction: Direction) {
        setDirection(direction)
    }

    const moveSnake = function () {
        setPositions((previousPositions) => createPositions(previousPositions, createNewPositionForward(headPosition, direction)))
    }

    return { eatFruit, headPosition, positions, updateDirection, moveSnake }
}
