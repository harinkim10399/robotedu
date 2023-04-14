import React from "react"
import "@testing-library/jest-dom/extend-expect";
import { screen, cleanup, act, render, fireEvent } from "@testing-library/react";
import { HomePage } from "../HomePage";

beforeEach(async () => {
  await act(async () => {
    render(<HomePage />);
  });
});
afterEach(cleanup);
//Unit Test
  it('Renders properly', () => {
     expect(screen.getByTestId('adam')).toBeInTheDocument()
  })
