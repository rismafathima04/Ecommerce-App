import { test, expect } from "vitest";
import { render } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import Layout from "../Day7/components/Layout";

test("Layout snapshot", () => {

  const { container } = render(
    <BrowserRouter>
      <Layout>
        <p>Snapshot Test</p>
      </Layout>
    </BrowserRouter>
  );

  expect(container).toMatchSnapshot();

});