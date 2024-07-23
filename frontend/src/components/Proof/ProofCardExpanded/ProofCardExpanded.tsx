import { Proof } from "@/types";
import { Box, Modal, ScrollArea, Stack, Text } from "@mantine/core";
import { FC } from "react";
import ProofCardControls from "../ProofCardControls/ProofCardControls";
import ProofCardHeader from "../ProofCardHeader/ProofCardHeader";
import ProofContent from "../ProofContent/ProofContent";

interface ProofCardExpandedProps {
  opened: boolean,
  close: () => void,
  proof: Proof
}

const ProofCardExpanded: FC<ProofCardExpandedProps> = ({
  opened,
  close,
  proof
}: ProofCardExpandedProps) => {
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
        <ProofContent proof={proof} expanded={true} />
      </Stack>
      <Box style={{borderTop: "1px solid var(--mantine-color-gray-3)"}} bg={"var(--mantine-primary-color-light)"} py={"xs"} px={"md"}>
        <ProofCardControls proof={proof} />
      </Box>
    </Modal>
  )
}

export default ProofCardExpanded;