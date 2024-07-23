import { useDeleteProof } from "@/hooks";
import { Proof } from "@/types";
import { ActionIcon, Text, Tooltip } from "@mantine/core";
import { modals } from "@mantine/modals";
import { IconTrash } from "@tabler/icons-react";
import { FC } from "react";

interface DeleteButtonProps {
  proof: Proof
}

const DeleteButton: FC<DeleteButtonProps> = ({ proof }: DeleteButtonProps) => {
  const { deleteProof } = useDeleteProof();

  const openDeleteModal = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.stopPropagation();

    modals.openConfirmModal({
      title: 'Delete your profile',
      centered: true,
      children: (
        <Text size="sm">
          Are you sure you want to delete this proof? This action is irreversible
        </Text>
      ),
      labels: { confirm: 'Delete proof', cancel: "No don't delete it" },
      confirmProps: { color: 'red' },
      onCancel: () => console.log('Cancel'),
      onConfirm: () => deleteProof(Number(proof.tokenId)),
    });
  }

  return (
    <Tooltip withArrow label="Delete proof">
      <ActionIcon variant="subtle" size={"lg"} color="red" onClick={e => openDeleteModal(e)}>
        <IconTrash size={16} />
      </ActionIcon>
    </Tooltip>
  )
}

export default DeleteButton;