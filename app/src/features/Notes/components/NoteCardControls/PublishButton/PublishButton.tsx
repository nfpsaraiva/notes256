import { useCreateNft } from "@/features/Nfts/hooks";
import { useDeleteNote } from "@/features/Notes/hooks";
import { Note } from "@/types";
import { ActionIcon, Text, Tooltip } from "@mantine/core";
import { modals } from "@mantine/modals";
import { IconUpload } from "@tabler/icons-react";
import { FC } from "react";
import { useNavigate } from "react-router-dom";

interface PublishButtonProps {
  note: Note
}

const PublishButton: FC<PublishButtonProps> = ({ note }: PublishButtonProps) => {
  const { createNft, creatingNft, nftCreated } = useCreateNft();
  const { deleteNote } = useDeleteNote()
  const navigate = useNavigate();

  const publish = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.stopPropagation();

    modals.openConfirmModal({
      title: 'Publish Note',
      radius: "lg",
      children: (
        <Text size="sm">
          Are you sure you want to publish this Note? This action is irreversible
        </Text>
      ),
      labels: { confirm: 'Publish Note', cancel: "No don't publish it" },
      confirmProps: { color: 'blue', radius: "lg" },
      cancelProps: { radius: "lg" },
      onCancel: () => console.log('Cancel'),
      onConfirm: () => {
        createNft({
          name: note.name,
          description: note.description
        });
      }
    })
  }

  if (nftCreated) {
    navigate('/nfts');
    deleteNote(note)
  }

  if (creatingNft) {
    return (
      <Tooltip label="Publish">
        <ActionIcon variant="subtle" size={"lg"} disabled>
          <IconUpload size={16} />
        </ActionIcon>
      </Tooltip>
    )
  }

  return (
    <Tooltip label="Publish">
      <ActionIcon variant="subtle" size={"lg"} onClick={e => publish(e)}>
        <IconUpload size={16} />
      </ActionIcon>
    </Tooltip>
  )
}

export default PublishButton;