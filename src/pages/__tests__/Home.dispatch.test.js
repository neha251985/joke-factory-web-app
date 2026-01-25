import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Home from "../Home";

// mock dispatch + selector state
const mockDispatch = jest.fn();
let mockState = { favorites: { items: [] } };

jest.mock("../../app/hooks", () => ({
  useAppDispatch: () => mockDispatch,
  useAppSelector: (selector) => selector(mockState),
}));

describe("Home - Add to Favorites dispatch", () => {
  beforeEach(() => {
    mockDispatch.mockClear();
    mockState = { favorites: { items: [] } };

    global.fetch = jest.fn((url) => {
      if (String(url).includes("/jokes/categories")) {
        return Promise.resolve({
          ok: true,
          json: async () => ["dev", "movie"],
        });
      }

      return Promise.resolve({
        ok: true,
        json: async () => ({ id: "abc", value: "Hello from API" }),
      });
    });
  });

  it('dispatches favorites/addFavorite with the joke payload when "Add to Favorites" is clicked', async () => {
    const user = userEvent.setup();
    render(<Home />);

    await waitFor(() =>
      expect(screen.getByText("Hello from API")).toBeInTheDocument()
    );

    await user.click(
      screen.getByRole("button", { name: /add to favorites/i })
    );

    expect(mockDispatch).toHaveBeenCalledTimes(1);

    const action = mockDispatch.mock.calls[0][0];
    expect(action.type).toBe("favorites/addFavorite");
    expect(action.payload).toEqual({ id: "abc", value: "Hello from API" });
  });
});
