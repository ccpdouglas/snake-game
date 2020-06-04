import { useState, useEffect, useCallback } from "react"
import { Direction, SnakePosition, Fruit } from "../../types"

interface UseSnakeProps {
    startingPosition: SnakePosition
    startingLength: number
}

interface SnakeContext {
    positions: SnakePosition[]
    headPosition: SnakePosition
    direction: Direction
    eatFruit(fruid: Fruit): void
    updateDirection(direction: Direction): void
    moveSnake(headPosition: SnakePosition, direction: Direction): void
}

const createNewPositionBehind = function (position: SnakePosition): SnakePosition {
    switch (position.direction) {
        case Direction.down:
            return { ...position, y: position.y - 1 }
        case Direction.up:
            return { ...position, y: position.y + 1 }
        case Direction.right:
            return { ...position, y: position.x - 1 }
        case Direction.left:
            return { ...position, y: position.x + 1 }
    }
}

const createNewPositionForward = function (position: SnakePosition, direction: Direction): SnakePosition {
    switch (direction) {
        case Direction.down:
            return { ...position, direction, y: position.y + 1 }
        case Direction.up:
            return { ...position, direction, y: position.y - 1 }
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

const increaseLengthByInt = function (positions: SnakePosition[], length: number) {
    for (let i = 0; i < length; i++) {
        positions = increaseSnakeLength(positions, createNewPositionBehind(positions[0]))
    }
    return positions
}

const delay = function (number: number): Promise<void> {
    return new Promise((resolve, reject) => {
        setTimeout(resolve, number)
    })
}

export default function ({ startingPosition, startingLength }: UseSnakeProps): SnakeContext {
    const [direction, setDirection] = useState(startingPosition.direction)
    const [positions, setPositions] = useState(increaseLengthByInt([startingPosition], startingLength))

    const headPosition = positions[positions.length - 1]

    const eatFruit = function (fruit: Fruit): void {
        setPositions((prev) => increaseLengthByInt(prev, fruit.value))
    }

    const updateDirection = useCallback(function (direction: Direction) {
        setDirection((previous) => {
            if (direction === Direction.right && previous === Direction.left) return previous
            if (direction === Direction.left && previous === Direction.right) return previous
            if (direction === Direction.up && previous === Direction.down) return previous
            if (direction === Direction.down && previous === Direction.up) return previous
            return direction
        })
    }, [])

    const moveSnake = useCallback(async function (headPosition, direction): Promise<void> {
        setPositions((previousPositions) => createPositions(previousPositions, createNewPositionForward(headPosition, direction)))
    }, [])

    return { eatFruit, headPosition, positions, updateDirection, direction, moveSnake }
}
