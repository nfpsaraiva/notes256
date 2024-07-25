import { useNote } from "@/features/Notes/hooks";
import { Note } from "@/types";
import { ActionIcon, Tooltip } from "@mantine/core";
import { IconArchive } from "@tabler/icons-react";
import { FC } from "react";

interface ArchiveButtonProps {
  note: Note
}

const ArchiveButton: FC<ArchiveButtonProps> = ({ note }: ArchiveButtonProps) => {
  const { archiveNote } = useNote(note)

  return (
    <Tooltip label="Archive">
      <ActionIcon variant="subtle" size={"lg"} onClick={() => archiveNote()}>
        <IconArchive size={16} />
      </ActionIcon>
    </Tooltip>
  )
}

export default ArchiveButton;