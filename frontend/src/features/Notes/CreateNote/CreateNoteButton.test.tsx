import { render, screen } from "@test-utils";
import CreateNoteButton from "./CreateNoteButton";

describe("CreateNoteButton", async () => {
  it("should render a button", async () => {
    render(<CreateNoteButton />);

    const button = screen.getByRole('button');

    expect(button).toBeVisible();
  });
});