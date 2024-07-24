import { Note } from "@/types";
import { Box, Modal, ScrollArea, Stack } from "@mantine/core";
import { FC } from "react";
import NoteCardControls from "../NoteCardControls/NoteCardControls";
import classes from "./NoteCardExpanded.module.css";
import NoteContent from "../NoteContent/NoteContent";

interface NoteCardExpandedProps {
  opened: boolean,
  close: () => void,
  openTransferModal: () => void,
  note: Note,
}

const NoteCardExpanded: FC<NoteCardExpandedProps> = ({
  opened,
  close,
  openTransferModal,
  note
}: NoteCardExpandedProps) => {
  return (
    <Modal
      centered
      radius={"lg"}
      size={"md"}
      padding={0}
      opened={opened}
      onClose={close}
      withCloseButton={false}
      scrollAreaComponent={ScrollArea.Autosize}
    >
      <Stack gap={"lg"} m={"lg"}>
        <NoteContent note={note} expanded={true} />
      </Stack>
      <Box className={classes.controlsContainer} bg={"var(--mantine-primary-color-light)"} py={"xs"} px={"md"}>
        <NoteCardControls note={note} openTransferModal={openTransferModal} />
      </Box>
    </Modal>
  )
}

export default NoteCardExpanded;