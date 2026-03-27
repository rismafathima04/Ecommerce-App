import { test, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import "@testing-library/jest-dom";
import Layout from "../Day7/components/Layout";

test("Layout renders children", () => {

  render(
    <BrowserRouter>
      <Layout>
        <p>Test Content</p>
      </Layout>
    </BrowserRouter>
  );

  expect(screen.getByText("Test Content")).toBeInTheDocument();

});