import { useDeleteNote } from "@/features/Notes/hooks";
import { Note } from "@/types";
import { ActionIcon, Text, Tooltip } from "@mantine/core";
import { modals } from "@mantine/modals";
import { IconTrash } from "@tabler/icons-react";
import { FC } from "react";

interface DeleteButtonProps {
  note: Note
}

const DeleteButton: FC<DeleteButtonProps> = ({ note }: DeleteButtonProps) => {
  const { deleteNote } = useDeleteNote();

  const openDeleteModal = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.stopPropagation();

    modals.openConfirmModal({
      title: 'Delete Note',
      radius: "lg",
      centered: true,
      children: (
        <Text size="sm">
          Are you sure you want to delete this Note? This action is irreversible
        </Text>
      ),
      labels: { confirm: 'Delete Note', cancel: "No don't delete it" },
      confirmProps: { color: 'red', radius: "lg" },
      cancelProps: { radius: "lg" },
      onCancel: () => console.log('Cancel'),
      onConfirm: () => deleteNote(note),
    });
  }

  return (
    <Tooltip label="Delete">
      <ActionIcon variant="subtle" size={"lg"} color="red" onClick={e => openDeleteModal(e)}>
        <IconTrash size={16} />
      </ActionIcon>
    </Tooltip>
  )
}

export default DeleteButton;