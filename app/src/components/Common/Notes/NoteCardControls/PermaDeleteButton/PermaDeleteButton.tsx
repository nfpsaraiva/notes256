import { useLocalNote } from "@/features/LocalNotes/hooks";
import { LocalNote } from "@/types";
import { ActionIcon, Text, Tooltip } from "@mantine/core";
import { modals } from "@mantine/modals";
import { IconTrash } from "@tabler/icons-react";
import { FC } from "react";

interface PermaDeleteButtonProps {
  localNote: LocalNote
}

const PermaDeleteButton: FC<PermaDeleteButtonProps> = ({
  localNote
}: PermaDeleteButtonProps) => {
  const { permaDeleteLocalNote } = useLocalNote(localNote);

  const openPermaDeleteLocalNoteModal = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.stopPropagation();
    
    modals.openConfirmModal({
      title: 'Perma delete localNote',
      radius: "lg",
      centered: false,
      children: (
        <Text size="sm">
          Are you sure you want to perma delete this localNote? This action is irreversible
        </Text>
      ),
      labels: { confirm: 'Delete localNote', cancel: "No don't delete it" },
      confirmProps: { color: 'red', radius: "lg" },
      cancelProps: {radius: "lg"},
      onCancel: () => console.log('Cancel'),
      onConfirm: () => permaDeleteLocalNote(),
    });
  }

  return (
    <Tooltip label="Permantly Delete">
      <ActionIcon variant="subtle" size={"lg"} color="red" onClick={e => openPermaDeleteLocalNoteModal(e)}>
        <IconTrash size={16} />
      </ActionIcon>
    </Tooltip>
  )
}

export default PermaDeleteButton;