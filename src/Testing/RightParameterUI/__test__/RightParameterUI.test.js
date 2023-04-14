import React from 'react';
import {RightParameterUI} from '../RightParameterUI'
import "@testing-library/jest-dom/extend-expect";
import { render, cleanup, act, screen, fireEvent, getByTestId } from "@testing-library/react";

beforeEach(async () => {
  await act(async () => {
    render(<RightParameterUI jQuery = "Bicycle"/>);
  });
});

afterEach(cleanup);
//Unit Testing given a prop value
it('Renders properly', () => {
     expect(screen.getByTestId('done')).toBeInTheDocument()
     expect(screen.getByTestId('r')).toBeInTheDocument()
     expect(screen.getByTestId('adam')).toBeInTheDocument()
  })