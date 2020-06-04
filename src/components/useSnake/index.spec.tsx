import { renderHook } from "@testing-library/react-hooks"
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
            useSnake({ startingPosition: { x: 1, y: 3, direction: Direction.down }, startingLength: 2 })
        )

        expect(result.current.positions).toEqual(expectedPositions)
    })

    it("should return head position correctly as the last item in the array of positions", () => {
        const startingPosition = { x: 1, y: 3, direction: Direction.down }
        const { result } = renderHook(() => useSnake({ startingPosition, startingLength: 2 }))
        expect(result.current.headPosition).toEqual(startingPosition)
    })
})
