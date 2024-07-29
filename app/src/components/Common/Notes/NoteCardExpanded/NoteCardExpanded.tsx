import { Note } from "@/types";
import { Modal, ScrollArea, Stack } from "@mantine/core";
import { FC, ReactNode } from "react";
import NoteContent from "../NoteContent/NoteContent";
import NoteContentEditable from "../NoteContentEditable/NoteContentEditable";

interface NoteCardExpandedProps {
  opened: boolean,
  close: () => void,
  note: Note,
  newTitle: string,
  newDescription: string,
  setNewTitle: React.Dispatch<React.SetStateAction<string>>,
  setNewDescription: React.Dispatch<React.SetStateAction<string>>,
  noteMenuIcon: ReactNode
}

const NoteCardExpanded: FC<NoteCardExpandedProps> = ({
  opened,
  close,
  note,
  newTitle,
  newDescription,
  setNewTitle,
  setNewDescription,
  noteMenuIcon
}: NoteCardExpandedProps) => {
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
        {
          note.editable === true
            ? <NoteContentEditable
              note={note}
              expanded={true}
              newTitle={newTitle}
              newDescription={newDescription}
              setNewTitle={setNewTitle}
              setNewDescription={setNewDescription}
              noteMenuIcon={noteMenuIcon}
            />
            : <NoteContent
              note={note}
              expanded={true}
              noteMenuIcon={noteMenuIcon}
            />
        }

      </Stack>
    </Modal>
  )
}

export default NoteCardExpanded;