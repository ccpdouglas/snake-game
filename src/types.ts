export enum Direction {
    up,
    down,
    left,
    right,
}

export interface GridPosition {
    x: number
    y: number
}

export interface SnakePosition extends GridPosition {
    direction: Direction
}

export interface SnakeProviderProps {
    startingPosition: GridPosition
    startingLength: number
    direction: Direction
}

export interface SnakeContext {
    positions: SnakePosition[]
    headPosition: SnakePosition
    length: number
    eatFruit(): void
    updateDirection(direction: Direction): void
}
