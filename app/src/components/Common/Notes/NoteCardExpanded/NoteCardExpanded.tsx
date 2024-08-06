import { Note } from "@/types";
import { Button, Modal, ScrollArea, Stack } from "@mantine/core";
import { FC, ReactNode, useState } from "react";
import NoteContentEditable from "../NoteContentEditable/NoteContentEditable";
import { IconCheck, IconPlus } from "@tabler/icons-react";

interface NoteCardExpandedProps {
  opened: boolean,
  close: () => void,
  note: Note,
  noteMenuIcon: ReactNode,
  updateNote: (note: Note) => void
}

const NoteCardExpanded: FC<NoteCardExpandedProps> = ({
  opened,
  close,
  note,
  noteMenuIcon,
  updateNote
}: NoteCardExpandedProps) => {
  const [newTitle, setNewTitle] = useState(note.name);
  const [newDescription, setNewDescription] = useState(note.description);

  const save = () => {
    updateNote({
      ...note,
      name: newTitle,
      description: newDescription
    });
    close();
  }


  return (
    <Modal
      radius={"lg"}
      size={"md"}
      padding={0}
      opened={opened}
      onClose={close}
      withCloseButton={false}
      scrollAreaComponent={ScrollArea.Autosize}
    >
      <Stack gap={"lg"} m={"lg"}>
        <NoteContentEditable
          note={note}
          expanded={true}
          newTitle={newTitle}
          newDescription={newDescription}
          setNewTitle={setNewTitle}
          setNewDescription={setNewDescription}
          noteMenuIcon={noteMenuIcon}
        />
        <Button
        leftSection={<IconCheck stroke={3} size={18} />}
        size="sm"
        radius={"lg"}
        variant="light"
        onClick={save}
        fw={700}
      >
        Save
      </Button>
      </Stack>
    </Modal>
  )
}

export default NoteCardExpanded;