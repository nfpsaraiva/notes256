import { Button } from "@mantine/core";
import { useOs } from "@mantine/hooks";
import { FC } from "react";
import NoteIcon from "../NoteIcon/NoteIcon";

const UserMenu: FC = () => {
  const os = useOs();

  return (
    <Button
      size="md"
      radius={"xl"}
      fw={700} variant="subtle"
      leftSection={
        <NoteIcon size={20} stroke={2} />
      }
    >
      {os === "undetermined" ? "Local device" : os}
    </Button>
  )
}

export default UserMenu;