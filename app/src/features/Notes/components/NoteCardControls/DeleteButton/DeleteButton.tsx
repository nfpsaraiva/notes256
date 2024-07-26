import { useUserbase } from "@/contexts";
import { Note } from "@/types";
import { ActionIcon, Tooltip } from "@mantine/core";
import { IconTrash } from "@tabler/icons-react";
import { FC } from "react";

interface DeleteButtonProps {
  note: Note
}

const DeleteButton: FC<DeleteButtonProps> = ({ note }: DeleteButtonProps) => {
  const { deleteNote } = useUserbase();


  return (
    <Tooltip label="Delete">
      <ActionIcon variant="subtle" size={"lg"} color="red" onClick={e => {
        e.stopPropagation();
        deleteNote(note)
      }}>
        <IconTrash size={16} />
      </ActionIcon>
    </Tooltip>
  )
}

export default DeleteButton;