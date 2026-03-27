import { test, expect } from "vitest";
import { calculateTotal } from "../Day7/utils/cartHelpers";

test("calculateTotal returns correct total", () => {

  const cart = [
    { price: 100 },
    { price: 200 }
  ];

  const total = calculateTotal(cart);

  expect(total).toBe(300);

});