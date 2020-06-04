import React from "react"
import { render } from "@testing-library/react"
import Square from "."
import { Direction } from "../../types"

const fruitSquareHit = jest.fn()

describe("Square", () => {
    it("should render", () => {
        render(<Square fruitSquareHit={fruitSquareHit} />)
    })

    it("should render square with a snake in it", () => {
        const { container } = render(
            <Square fruitSquareHit={fruitSquareHit} snakeSection={{ direction: Direction.left, isHead: false }} />
        )

        expect(container.firstChild).toHaveClass("SnakeSquare")
    })

    it("should render square with snake head styling", () => {
        const { container } = render(
            <Square fruitSquareHit={fruitSquareHit} snakeSection={{ direction: Direction.left, isHead: true }} />
        )

        expect(container.firstChild).toHaveClass("SnakeSquare")
        expect(container.firstChild).toHaveClass("SnakeSquareHead")
    })

    it("should render square with fruit styling", () => {
        const { container } = render(<Square fruitSquareHit={fruitSquareHit} fruit={{ value: 1, x: 1, y: 1 }} />)

        expect(container.firstChild).toHaveClass("FruitSquare")
    })

    it("should fire fruitSquareHit when snake head and fruit coexist", () => {
        render(
            <Square
                fruitSquareHit={fruitSquareHit}
                fruit={{ value: 1, x: 1, y: 1 }}
                snakeSection={{ isHead: true, direction: Direction.down }}
            />
        )

        expect(fruitSquareHit).toHaveBeenCalled()
    })
})
