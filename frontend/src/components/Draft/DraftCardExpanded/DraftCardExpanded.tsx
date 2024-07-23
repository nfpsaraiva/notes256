import { Draft } from "@/types";
import { Box, Modal, ScrollArea, Stack } from "@mantine/core";
import { FC } from "react";
import classes from "./DraftCardExpanded.module.css";
import DraftContent from "../DraftContent/DraftContent";
import DraftCardControls from "../DraftCardControls/DraftCardControls";

interface DraftCardExpandedProps {
  opened: boolean,
  close: () => void,
  draft: Draft,
}

const DraftCardExpanded: FC<DraftCardExpandedProps> = ({
  opened,
  close,
  draft
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
        <DraftContent draft={draft} expanded={true} />
      </Stack>
      <Box className={classes.controlsContainer} bg={"var(--mantine-primary-color-light)"} py={"xs"} px={"md"}>
        <DraftCardControls draft={draft} expanded={true} />
      </Box>
    </Modal>
  )
}

export default DraftCardExpanded;