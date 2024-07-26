import { useUserbase } from "@/contexts";
import { Status } from "@/features/Notes/enums";
import { useNote } from "@/features/Notes/hooks";
import { Note } from "@/types";
import { ActionIcon, Tooltip } from "@mantine/core";
import { IconArchive } from "@tabler/icons-react";
import { FC } from "react";

interface ArchiveButtonProps {
  note: Note
}

const ArchiveButton: FC<ArchiveButtonProps> = ({ note }: ArchiveButtonProps) => {
  const { archiveNote } = useUserbase()

  const archive = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.stopPropagation();

    archiveNote(note);
  }

  return (
    <Tooltip label="Archive">
      <ActionIcon variant="subtle" size={"lg"} onClick={e => archive(e)}>
        <IconArchive size={16} />
      </ActionIcon>
    </Tooltip>
  )
}

export default ArchiveButton;