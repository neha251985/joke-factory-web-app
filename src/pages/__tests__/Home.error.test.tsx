import { screen, waitFor } from "@testing-library/react";
import Home from "../Home";
import { renderWithProviders } from "../../test/renderWithProviders";

describe("Home - error state", () => {
  beforeEach(() => {
     global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: false,
        status: 500,
        json: async () => ({}),
      } as any)
    ) as any;
  });

  it("shows an error message when an API call fails", async () => {
    renderWithProviders(<Home />);

    await waitFor(() => {
      expect(screen.getByRole("alert")).toHaveTextContent("Request failed: 500");
    });
  });
});
