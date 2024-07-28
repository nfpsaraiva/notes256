import { useUserbase } from "@/contexts";
import { LocalNote } from "@/types";
import { ActionIcon, Tooltip } from "@mantine/core";
import { IconTrash } from "@tabler/icons-react";
import { FC } from "react";

interface DeleteButtonProps {
  localNote: LocalNote
}

const DeleteButton: FC<DeleteButtonProps> = ({ localNote }: DeleteButtonProps) => {
  const { deleteLocalNote } = useUserbase();


  return (
    <Tooltip label="Delete">
      <ActionIcon variant="subtle" size={"lg"} color="red" onClick={e => {
        e.stopPropagation();
        deleteLocalNote(localNote)
      }}>
        <IconTrash size={16} />
      </ActionIcon>
    </Tooltip>
  )
}

export default DeleteButton;