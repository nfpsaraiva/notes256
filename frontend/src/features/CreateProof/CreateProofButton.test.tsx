import { fireEvent, render, screen } from "@test-utils";
import CreateProofButton from "./CreateProofButton";

describe("CreateProofButton", async () => {
  it("should render a button", async () => {
    render(<CreateProofButton />);

    const button = screen.getByRole('button');

    expect(button).toBeVisible();
  });
});