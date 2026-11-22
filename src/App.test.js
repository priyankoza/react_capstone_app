import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import App from "./App";

test("renders the Reservations link", () => {
  render(
    <MemoryRouter>
      <App />
    </MemoryRouter>
  );
  const links = screen.getAllByText("Reservations");
  expect(links.length).toBeGreaterThan(0);
});