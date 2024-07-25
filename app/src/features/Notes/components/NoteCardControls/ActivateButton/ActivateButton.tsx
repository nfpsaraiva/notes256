import { useNote } from "@/features/Notes/hooks";
import { Note } from "@/types";
import { ActionIcon, Tooltip } from "@mantine/core";
import { IconUpload } from "@tabler/icons-react";
import { FC } from "react";

interface ActivateButtonProps {
  note: Note
}

const ActivateButton: FC<ActivateButtonProps> = ({ note }: ActivateButtonProps) => {
  const { activateNote } = useNote(note);

  return (
    <Tooltip label="Activate">
      <ActionIcon variant="subtle" size={"lg"} onClick={activateNote}>
        <IconUpload size={16} />
      </ActionIcon>
    </Tooltip>
  )
}

export default ActivateButton;