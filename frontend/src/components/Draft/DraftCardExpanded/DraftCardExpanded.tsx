import { Draft } from "@/types";
import { Box, Modal, ScrollArea, Stack } from "@mantine/core";
import { FC, useState } from "react";
import classes from "./DraftCardExpanded.module.css";
import DraftContent from "../DraftContent/DraftContent";
import DraftCardControls from "../DraftCardControls/DraftCardControls";

interface DraftCardExpandedProps {
  opened: boolean,
  close: () => void,
  draft: Draft,
  newTitle: string,
  newDescription: string,
  setNewTitle: React.Dispatch<React.SetStateAction<string>>,
  setNewDescription: React.Dispatch<React.SetStateAction<string>>
}

const DraftCardExpanded: FC<DraftCardExpandedProps> = ({
  opened,
  close,
  draft,
  newTitle,
  newDescription,
  setNewTitle,
  setNewDescription
}: DraftCardExpandedProps) => {
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
        <DraftContent
          draft={draft}
          expanded={true}
          newTitle={newTitle}
          newDescription={newDescription}
          setNewTitle={setNewTitle}
          setNewDescription={setNewDescription}
        />
      </Stack>
      <Box className={classes.controlsContainer} bg={"var(--mantine-primary-color-light)"} py={"xs"} px={"md"}>
        <DraftCardControls
          draft={draft}
          expanded={true}
          newTitle={newTitle}
          newDescription={newDescription}
        />
      </Box>
    </Modal>
  )
}

export default DraftCardExpanded;