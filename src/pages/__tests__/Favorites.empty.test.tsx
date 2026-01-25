import { screen } from "@testing-library/react";
import Favorites from "../Favorites";
import { renderWithProviders } from "../../test/renderWithProviders";

describe("Favorites page (empty)", () => {
  it("shows empty state when favorites list is empty", () => {
    renderWithProviders(<Favorites />, {
      route: "/favorites",
      preloadedState: {
        favorites: {
          items: [],
        },
      },
    });

    expect(
      screen.getByText("You haven't saved any jokes yet!")
    ).toBeInTheDocument();
  });
});
