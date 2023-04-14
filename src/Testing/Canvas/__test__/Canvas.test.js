import React from "react"
import "@testing-library/jest-dom/extend-expect";
import { screen, cleanup, act, render } from "@testing-library/react";
import { Canvas } from "../Canvas";

beforeEach(async () => {
  await act(async () => {
    render(<Canvas jQuery = "RET" />);
  });
});
afterEach(cleanup);

  it('Renders properly and executed jQuery given props from another component', () => {
     expect(screen.getByTestId('c')).toBeInTheDocument()
  })
