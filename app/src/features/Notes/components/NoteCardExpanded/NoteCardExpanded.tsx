import { Note } from "@/types";
import { Box, Modal, ScrollArea, Stack } from "@mantine/core";
import { FC, useState } from "react";
import classes from "./NoteCardExpanded.module.css";
import NoteCardControls from "../NoteCardControls/NoteCardControls";
import NoteContent from "../NoteContent/NoteContent";

interface NoteCardExpandedProps {
  opened: boolean,
  close: () => void,
  note: Note,
  newTitle: string,
  newDescription: string,
  setNewTitle: React.Dispatch<React.SetStateAction<string>>,
  setNewDescription: React.Dispatch<React.SetStateAction<string>>
}

const NoteCardExpanded: FC<NoteCardExpandedProps> = ({
  opened,
  close,
  note,
  newTitle,
  newDescription,
  setNewTitle,
  setNewDescription
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
        <NoteContent
          note={note}
          expanded={true}
          newTitle={newTitle}
          newDescription={newDescription}
          setNewTitle={setNewTitle}
          setNewDescription={setNewDescription}
        />
      </Stack>
      <Box className={classes.controlsContainer} bg={"var(--mantine-primary-color-light)"} py={"xs"} px={"md"}>
        <NoteCardControls
          note={note}
          expanded={true}
          newTitle={newTitle}
          newDescription={newDescription}
        />
      </Box>
    </Modal>
  )
}

export default NoteCardExpanded;