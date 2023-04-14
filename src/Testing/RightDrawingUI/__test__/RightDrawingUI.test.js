import React from "react"
import "@testing-library/jest-dom/extend-expect";
import { screen, cleanup, act, render } from "@testing-library/react";
import { RightDrawingUI } from "../RightDrawingUI";

beforeEach(async () => {
  await act(async () => {
    render(<RightDrawingUI />);
  });
});
afterEach(cleanup);
//Unit Test
  it('Renders properly', () => {
     expect(screen.getByTestId('done')).toBeInTheDocument()
  })

