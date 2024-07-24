import { Draft } from "@/types";
import { ActionIcon, Text, Tooltip } from "@mantine/core";
import { useLocalStorage } from "@mantine/hooks";
import { modals } from "@mantine/modals";
import { IconTrash } from "@tabler/icons-react";
import { FC } from "react";

interface DeleteButtonProps {
  draft: Draft
}

const DeleteButton: FC<DeleteButtonProps> = ({ draft }: DeleteButtonProps) => {
  const [drafts, setDrafts] = useLocalStorage<Draft[]>({
    key: "provify-drafts",
    defaultValue: []
  });

  const openDeleteModal = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.stopPropagation();


    modals.openConfirmModal({
      title: 'Delete Draft',
      radius: "lg",
      centered: true,
      children: (
        <Text size="sm">
          Are you sure you want to delete this Draft? This action is irreversible
        </Text>
      ),
      labels: { confirm: 'Delete Draft', cancel: "No don't delete it" },
      confirmProps: { color: 'red', radius: "lg" },
      cancelProps: {radius: "lg"},
      onCancel: () => console.log('Cancel'),
      onConfirm: () => {
        const newDrafts = drafts.filter(d => d.id !== draft.id);
        setDrafts(newDrafts)
      },
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