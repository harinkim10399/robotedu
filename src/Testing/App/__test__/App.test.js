import React from "react"
import "@testing-library/jest-dom/extend-expect";
import { screen, cleanup, act, render, fireEvent } from "@testing-library/react";
import { App } from "../App";
import ShallowRenderer from 'react-test-renderer/shallow'; // ES6


beforeEach(async () => {
  await act(async () => {
    render(<App />);
  });
});

afterEach(cleanup);
//integration testing with different components
  it('Renders another component based on click event', () => {
     const element = screen.getByTestId('a')
     fireEvent.click(element);
     expect(screen.getByTestId('adam')).toBeInTheDocument()
  })
//Unit Test
  it('Shallow rendering', () => {
    const renderer = new ShallowRenderer();
    renderer.render(<App />);
    const result = renderer.getRenderOutput();
    expect(result.state).toBe(undefined);
  });
