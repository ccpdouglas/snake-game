import React from "react"
import { render, fireEvent } from "@testing-library/react"
import GameOver from "."

describe("Game Over overlay", () => {
    it("should render", () => {
        render(<GameOver restartGame={() => {}} score={0} />)
    })

    it("should display score", () => {
        const { getByText } = render(<GameOver restartGame={() => {}} score={10} />)
        expect(getByText("Score: 10")).not.toBeUndefined()
    })

    it("should run reset game on click of restart button", () => {
        const restartGameMock = jest.fn()
        const { getByText } = render(<GameOver restartGame={restartGameMock} score={10} />)
        const restartButton = getByText("Restart")
        fireEvent.click(restartButton)
        expect(restartGameMock).toHaveBeenCalled()
    })
})
