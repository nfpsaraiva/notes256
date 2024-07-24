import { useCreateProof } from "@/hooks";
import { Draft } from "@/types";
import { ActionIcon, Text, Tooltip } from "@mantine/core";
import { useLocalStorage } from "@mantine/hooks";
import { modals } from "@mantine/modals";
import { IconCertificate } from "@tabler/icons-react";
import { FC } from "react";
import { useNavigate } from "react-router-dom";

interface PublishButtonProps {
  draft: Draft
}

const PublishButton: FC<PublishButtonProps> = ({ draft }: PublishButtonProps) => {
  const { createProof, creatingProof, proofCreated } = useCreateProof();
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
        createProof({
          name: draft.name,
          description: draft.description
        });
      },
    });
  }

  if (proofCreated) {
    const newDrafts = drafts.filter(d => d.id !== draft.id);
    setDrafts(newDrafts);
    
    navigate('/');
  }

  if (creatingProof) {
    return (
      <Tooltip label="Publish">
        <ActionIcon variant="subtle" size={"lg"} disabled>
          <IconCertificate size={16} />
        </ActionIcon>
      </Tooltip>
    )
  }

  return (
    <Tooltip label="Publish">
      <ActionIcon variant="subtle" size={"lg"} onClick={e => publish(e)}>
        <IconCertificate size={16} />
      </ActionIcon>
    </Tooltip>
  )
}

export default PublishButton;