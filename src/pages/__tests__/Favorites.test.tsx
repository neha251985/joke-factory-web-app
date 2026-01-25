import { screen } from "@testing-library/react";
import Favorites from "../Favorites";
import { renderWithProviders } from "../../test/renderWithProviders";

describe("Favorites page", () => {
  it("renders jokes coming from the Redux store", () => {
    renderWithProviders(<Favorites />, {
      route: "/favorites",
      preloadedState: {
        favorites: {
          items: [
            { id: "1", value: "Store joke 1" },
            { id: "2", value: "Store joke 2" },
          ],
        },
      },
    });

    expect(screen.getByText("Store joke 1")).toBeInTheDocument();
    expect(screen.getByText("Store joke 2")).toBeInTheDocument();
  });
});
