import { useCreateNote } from "@/hooks";
import { Draft } from "@/types";
import { ActionIcon, Text, Tooltip } from "@mantine/core";
import { useLocalStorage } from "@mantine/hooks";
import { modals } from "@mantine/modals";
import { IconCertificate, IconUpload } from "@tabler/icons-react";
import { FC } from "react";
import { useNavigate } from "react-router-dom";

interface PublishButtonProps {
  draft: Draft
}

const PublishButton: FC<PublishButtonProps> = ({ draft }: PublishButtonProps) => {
  const { createNote, creatingNote, noteCreated } = useCreateNote();
  const navigate = useNavigate();
  const [drafts, setDrafts] = useLocalStorage<Draft[]>({
    key: "provify-drafts",
    defaultValue: []
  });

  const publish = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.stopPropagation();

    modals.openConfirmModal({
      title: 'Publish Draft',
      radius: "lg",
      centered: true,
      children: (
        <Text size="sm">
          Are you sure you want to publish this Draft? This action is irreversible
        </Text>
      ),
      labels: { confirm: 'Publish Draft', cancel: "No don't publish it" },
      confirmProps: { color: 'blue', radius: "lg" },
      cancelProps: {radius: "lg"},
      onCancel: () => console.log('Cancel'),
      onConfirm: () => {
        createNote({
          name: draft.name,
          description: draft.description
        });
      },
    });
  }

  if (noteCreated) {
    const newDrafts = drafts.filter(d => d.id !== draft.id);
    setDrafts(newDrafts);
    
    navigate('/');
  }

  if (creatingNote) {
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