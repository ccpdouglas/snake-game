import React from "react"
import { render } from "@testing-library/react"
import GridRow from "."
import { Direction } from "../../types"

const fruitSquareHit = jest.fn()

describe("Grid Row", () => {
    it("should render", () => {
        render(
            <GridRow
                fruit={{ value: 1, x: 1, y: 1 }}
                fruitSquareHit={fruitSquareHit}
                headPosition={{ x: 1, y: 1, direction: Direction.down }}
                row={1}
                snakePositions={[{ x: 1, y: 1, direction: Direction.down }]}
                width={10}
            />
        )
    })

    it("should render 5 squares when width is 5", () => {
        const { getAllByTestId } = render(
            <GridRow
                fruit={{ value: 1, x: 1, y: 1 }}
                fruitSquareHit={fruitSquareHit}
                headPosition={{ x: 1, y: 1, direction: Direction.down }}
                row={1}
                snakePositions={[{ x: 1, y: 1, direction: Direction.down }]}
                width={5}
            />
        )

        const squares = getAllByTestId("Square")
        expect(squares.length).toBe(5)
    })
})
