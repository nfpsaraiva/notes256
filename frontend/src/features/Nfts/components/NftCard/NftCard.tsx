import { Card } from "@mantine/core";
import { FC } from "react";
import classes from "./NftCard.module.css";
import { useDisclosure } from "@mantine/hooks";
import TransferModal from "../NftCardControls/TransferModal/TransferModal";
import { Nft } from "@/types";
import NftCardControls from "../NftCardControls/NftCardControls";
import NftCardExpanded from "../NftCardExpanded/NftCardExpanded";
import NftContent from "../NftContent/NftContent";

interface NftCardProps {
  nft: Nft
}

const NftCard: FC<NftCardProps> = ({ nft }: NftCardProps) => {
  const [opened, { open, close }] = useDisclosure(false);
  const [transferModalOpened, transferModalHandle] = useDisclosure(false);
  console.log(nft);

  return (
    <>
      <Card onClick={open} className={classes.nftCard} radius={"lg"} h={280} padding={"lg"} withBorder shadow="md">
        <NftContent nft={nft} expanded={false} />
        <Card.Section withBorder bg={"var(--mantine-primary-color-light)"} py={4} inheritPadding>
          <NftCardControls nft={nft} openTransferModal={transferModalHandle.open} />
        </Card.Section>
      </Card>
      <NftCardExpanded opened={opened} openTransferModal={transferModalHandle.open} close={close} nft={nft} />
      <TransferModal opened={transferModalOpened} close={transferModalHandle.close} nft={nft} />
    </>
  )
}

export default NftCard;