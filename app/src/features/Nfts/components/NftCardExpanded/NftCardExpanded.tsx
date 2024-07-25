import { Nft } from "@/types";
import { Box, Modal, ScrollArea, Stack } from "@mantine/core";
import { FC } from "react";
import NftCardControls from "../NftCardControls/NftCardControls";
import classes from "./NftCardExpanded.module.css";
import NftContent from "../NftContent/NftContent";

interface NftCardExpandedProps {
  opened: boolean,
  close: () => void,
  openTransferModal: () => void,
  nft: Nft,
}

const NftCardExpanded: FC<NftCardExpandedProps> = ({
  opened,
  close,
  openTransferModal,
  nft
}: NftCardExpandedProps) => {
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
        <NftContent nft={nft} expanded={true} />
      </Stack>
      <Box className={classes.controlsContainer} bg={"var(--mantine-primary-color-light)"} py={"xs"} px={"md"}>
        <NftCardControls nft={nft} openTransferModal={openTransferModal} />
      </Box>
    </Modal>
  )
}

export default NftCardExpanded;