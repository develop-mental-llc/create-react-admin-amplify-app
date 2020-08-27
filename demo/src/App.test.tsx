/**
 * @jest-environment jsdom
 */
import React from "react";
import { render, act } from "@testing-library/react";
import App from "./App";
import "@testing-library/jest-dom/extend-expect";

test("renders learn react link", () => {
  const { getAllByText } = render(<App />);
  const linkElement = getAllByText(/Posts/i);
  expect(linkElement[0]).toBeInTheDocument();
});
