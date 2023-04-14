import React from "react"
import "@testing-library/jest-dom/extend-expect";
import { screen, cleanup, act, render } from "@testing-library/react";
import { Navbar } from "../Navbar";

beforeEach(async () => {
  await act(async () => {
    render(<Navbar />);
  });
});
afterEach(cleanup);

  it('Renders properly and executed jQuery given props from another component', () => {
     expect(screen.getByTestId('p')).toBeInTheDocument()
  })
