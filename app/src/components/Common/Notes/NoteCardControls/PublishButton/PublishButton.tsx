import { useCreateBlockNote } from "@/features/BlockNotes/hooks";
import { useLocalNotes } from "@/features/LocalNotes/hooks";
import { LocalNote } from "@/types";
import { ActionIcon, Button, Text, Tooltip } from "@mantine/core";
import { modals } from "@mantine/modals";
import { IconCheck, IconPlus } from "@tabler/icons-react";
import { FC } from "react";
import { useNavigate } from "react-router-dom";

interface PublishButtonProps {
  localNote: LocalNote
}

const PublishButton: FC<PublishButtonProps> = ({ localNote }: PublishButtonProps) => {
  const { createBlockNote, creatingBlockNote, blockNotecreated } = useCreateBlockNote();
  const { deleteLocalNote } = useLocalNotes(localNote)
  const navigate = useNavigate();

  const publish = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.stopPropagation();

    modals.openConfirmModal({
      title: 'Publish LocalNote',
      radius: "lg",
      children: (
        <Text size="sm">
          Are you sure you want to publish this LocalNote? This action is irreversible
        </Text>
      ),
      labels: { confirm: 'Publish LocalNote', cancel: "No don't publish it" },
      confirmProps: { color: 'blue', radius: "lg" },
      cancelProps: { radius: "lg" },
      onCancel: () => console.log('Cancel'),
      onConfirm: () => {
        createBlockNote({
          name: localNote.name,
          description: localNote.description
        });
      }
    })
  }

  if (blockNotecreated) {
    navigate('/nfts');
    deleteLocalNote()
  }

  if (creatingBlockNote) {
    return (
      <Tooltip label="Publish">
        <ActionIcon variant="subtle" size={"lg"} disabled>
          <IconCheck size={16} />
        </ActionIcon>
      </Tooltip>
    )
  }

  return (
    <Tooltip label="Publish">
      <Button onClick={e => publish(e)} leftSection={<IconPlus size={14} />} size="compact-xs" variant="subtle">
        NFT
      </Button>
    </Tooltip>
  )
}

export default PublishButton;