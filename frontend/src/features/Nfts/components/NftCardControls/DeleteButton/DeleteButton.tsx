import { useDeleteNft } from "@/features/Nfts/hooks";
import { Nft } from "@/types";
import { ActionIcon, Text, Tooltip } from "@mantine/core";
import { modals } from "@mantine/modals";
import { IconTrash } from "@tabler/icons-react";
import { FC } from "react";

interface DeleteButtonProps {
  nft: Nft
}

const DeleteButton: FC<DeleteButtonProps> = ({ nft }: DeleteButtonProps) => {
  const { deleteNft } = useDeleteNft();

  const openDeleteModal = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.stopPropagation();

    modals.openConfirmModal({
      title: 'Delete Nft',
      radius: "lg",
      centered: true,
      children: (
        <Text size="sm">
          Are you sure you want to delete this nft? This action is irreversible
        </Text>
      ),
      labels: { confirm: 'Delete nft', cancel: "No don't delete it" },
      confirmProps: { color: 'red', radius: "lg" },
      cancelProps: {radius: "lg"},
      onCancel: () => console.log('Cancel'),
      onConfirm: () => deleteNft(Number(nft.tokenId)),
    });
  }

  return (
    <Tooltip withArrow label="Delete nft">
      <ActionIcon variant="subtle" size={"lg"} color="red" onClick={e => openDeleteModal(e)}>
        <IconTrash size={16} />
      </ActionIcon>
    </Tooltip>
  )
}

export default DeleteButton;