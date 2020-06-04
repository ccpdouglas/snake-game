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

export interface SnakeSection {
    direction: Direction
    isHead: boolean
}

export interface Fruit {
    value: number
}
