import { renderHook, act } from "@testing-library/react-hooks"
import { Direction } from "../../types"
import useSnake from "."

describe("snake hook", () => {
    it("should initialize positions correctly", () => {
        const expectedPositions = [
            { x: 1, y: 1, direction: Direction.down },
            { x: 1, y: 2, direction: Direction.down },
            { x: 1, y: 3, direction: Direction.down }
        ]

        const { result } = renderHook(() =>
            useSnake({ startingPosition: { x: 1, y: 3, direction: Direction.down }, startingLength: 3 })
        )

        expect(result.current.positions).toEqual(expectedPositions)
    })

    it("should return head position correctly as the last item in the array of positions", () => {
        const startingPosition = { x: 1, y: 3, direction: Direction.down }
        const { result } = renderHook(() => useSnake({ startingPosition, startingLength: 2 }))
        expect(result.current.headPosition).toEqual(startingPosition)
    })

    it("should set snakeHitSelf to true when head occupies position of snake elsewhere", () => {
        const startingPosition = { x: 1, y: 10, direction: Direction.down }
        const startingLength = 10
        const { result } = renderHook(() => useSnake({ startingPosition, startingLength }))
        expect(result.current.snakeHitSelf).toEqual(false)
        act(() => result.current.moveSnake(result.current.headPosition, Direction.right))
        act(() => result.current.moveSnake(result.current.headPosition, Direction.up))
        act(() => result.current.moveSnake(result.current.headPosition, Direction.left))
        expect(result.current.snakeHitSelf).toEqual(true)
    })

    it("should set the intial direction and update it", () => {
        const startingPosition = { x: 1, y: 10, direction: Direction.down }
        const startingLength = 10
        const { result } = renderHook(() => useSnake({ startingPosition, startingLength }))
        expect(result.current.direction).toEqual(Direction.down)
        act(() => result.current.updateDirection(Direction.right))
        expect(result.current.direction).toEqual(Direction.right)
    })

    it("should not change the direction if set to opposite of current direction", () => {
        const startingPosition = { x: 1, y: 10, direction: Direction.down }
        const startingLength = 10
        const { result } = renderHook(() => useSnake({ startingPosition, startingLength }))
        act(() => result.current.updateDirection(Direction.up))
        expect(result.current.direction).toEqual(Direction.down) // expect down
        act(() => result.current.updateDirection(Direction.right))
        act(() => result.current.updateDirection(Direction.left))
        expect(result.current.direction).toEqual(Direction.right) // expect right
        act(() => result.current.updateDirection(Direction.up))
        act(() => result.current.updateDirection(Direction.down))
        expect(result.current.direction).toEqual(Direction.up) // expect up
        act(() => result.current.updateDirection(Direction.left))
        act(() => result.current.updateDirection(Direction.right))
        expect(result.current.direction).toEqual(Direction.left) // expect left
    })

    it("should increase length when fruit is eaten", () => {
        const startingPosition = { x: 1, y: 15, direction: Direction.down }
        const startingLength = 10
        const { result } = renderHook(() => useSnake({ startingPosition, startingLength }))
        act(() => result.current.eatFruit({ x: 1, y: 10, value: 1 }))
        expect(result.current.positions.length).toEqual(11)
        expect(result.current.positions[0]).toEqual({ x: 1, y: 5, direction: Direction.down })
    })
})
