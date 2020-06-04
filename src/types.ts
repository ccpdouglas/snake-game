export enum Direction {
    up,
    down,
    left,
    right
}

export interface GridPosition {
    x: number
    y: number
}

export interface SnakePosition extends GridPosition {
    direction: Direction
}

export interface Fruit extends GridPosition {
    value: number
}

export interface SnakeSection {
    direction: Direction
    isHead: boolean
}
