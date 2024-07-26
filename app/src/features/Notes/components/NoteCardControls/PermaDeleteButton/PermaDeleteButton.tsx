import { useNote } from "@/features/Notes/hooks";
import { Note } from "@/types";
import { ActionIcon, Text, Tooltip } from "@mantine/core";
import { modals } from "@mantine/modals";
import { IconTrash } from "@tabler/icons-react";
import { FC } from "react";

interface PermaDeleteButtonProps {
  note: Note
}

const PermaDeleteButton: FC<PermaDeleteButtonProps> = ({
  note
}: PermaDeleteButtonProps) => {
  const { permaDeleteNote } = useNote(note);

  const openPermaDeleteNoteModal = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.stopPropagation();
    
    modals.openConfirmModal({
      title: 'Perma delete note',
      radius: "lg",
      centered: false,
      children: (
        <Text size="sm">
          Are you sure you want to perma delete this note? This action is irreversible
        </Text>
      ),
      labels: { confirm: 'Delete note', cancel: "No don't delete it" },
      confirmProps: { color: 'red', radius: "lg" },
      cancelProps: {radius: "lg"},
      onCancel: () => console.log('Cancel'),
      onConfirm: () => permaDeleteNote(),
    });
  }

  return (
    <Tooltip label="Permantly Delete">
      <ActionIcon variant="subtle" size={"lg"} color="red" onClick={e => openPermaDeleteNoteModal(e)}>
        <IconTrash size={16} />
      </ActionIcon>
    </Tooltip>
  )
}

export default PermaDeleteButton;