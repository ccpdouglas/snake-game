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

export interface SnakeSection {
    direction: Direction
    nextDirection: Direction
}

export interface Fruit {
    value: number
}
