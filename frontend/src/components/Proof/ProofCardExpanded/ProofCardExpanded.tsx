import { Proof } from "@/types";
import { Box, Modal, ScrollArea, Stack } from "@mantine/core";
import { FC } from "react";
import ProofCardControls from "../ProofCardControls/ProofCardControls";
import ProofContent from "../ProofContent/ProofContent";
import classes from "./ProofCardExpanded.module.css";

interface ProofCardExpandedProps {
  opened: boolean,
  close: () => void,
  openTransferModal: () => void,
  proof: Proof,
}

const ProofCardExpanded: FC<ProofCardExpandedProps> = ({
  opened,
  close,
  openTransferModal,
  proof
}: ProofCardExpandedProps) => {
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
        <ProofContent proof={proof} expanded={true} />
      </Stack>
      <Box className={classes.controlsContainer} bg={"var(--mantine-primary-color-light)"} py={"xs"} px={"md"}>
        <ProofCardControls proof={proof} openTransferModal={openTransferModal} />
      </Box>
    </Modal>
  )
}

export default ProofCardExpanded;