import { useState, useCallback } from "react"
import { Direction, SnakePosition, Fruit } from "../../types"

interface UseSnakeProps {
    startingPosition: SnakePosition
    startingLength: number
}

interface SnakeContext {
    positions: SnakePosition[]
    headPosition: SnakePosition
    direction: Direction
    snakeHitSelf: boolean
    eatFruit(fruid: Fruit): void
    updateDirection(direction: Direction): void
    moveSnake(headPosition: SnakePosition, direction: Direction): void
    resetSnake(): void
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

export default function ({ startingPosition, startingLength }: UseSnakeProps): SnakeContext {
    const [direction, setDirection] = useState(startingPosition.direction)
    const [positions, setPositions] = useState(increaseLengthByInt([startingPosition], startingLength - 1))
    const [snakeHitSelf, setSnakeHitSelf] = useState(false)

    const headPosition = positions[positions.length - 1]

    const resetSnake = function () {
        setSnakeHitSelf(false)
        setDirection(startingPosition.direction)
        setPositions(increaseLengthByInt([startingPosition], startingLength))
    }

    const eatFruit = useCallback(function (fruit: Fruit): void {
        setPositions((prev) => increaseLengthByInt(prev, fruit.value))
    }, [])

    const updateDirection = useCallback(function (direction: Direction) {
        setDirection((previous) => {
            if (direction === Direction.right && previous === Direction.left) return previous
            if (direction === Direction.left && previous === Direction.right) return previous
            if (direction === Direction.up && previous === Direction.down) return previous
            if (direction === Direction.down && previous === Direction.up) return previous
            return direction
        })
    }, [])

    const moveSnake = useCallback(function (headPosition, direction): void {
        setPositions((previousPositions) => {
            const newPosition = createNewPositionForward(headPosition, direction)
            const duplicatedPositions = previousPositions.filter(({ x, y }) => x === newPosition.x && y === newPosition.y)
            setSnakeHitSelf(duplicatedPositions.length > 0)
            return createPositions(previousPositions, newPosition)
        })
    }, [])

    return { headPosition, positions, snakeHitSelf, direction, eatFruit, updateDirection, moveSnake, resetSnake }
}
