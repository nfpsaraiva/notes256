import { Nft } from "@/types";
import { Group } from "@mantine/core";
import { FC } from "react";
import DeleteButton from "./DeleteButton/DeleteButton";
import TransferNft from "./TransferButton/TransferButton";
import { useWeb3ModalAccount } from "@web3modal/ethers/react";
import CopyButton from "./CopyButton/CopyButton";
import MenuButton from "./MenuButton/MenuButton";

interface NftCardControlsProps {
  nft: Nft,
  openTransferModal: () => void
}

const NftCardControls: FC<NftCardControlsProps> = ({
  nft,
  openTransferModal
}: NftCardControlsProps) => {
  const { address } = useWeb3ModalAccount();

  const isOwner = address === nft.owner;

  return (
    <Group justify="space-between">
      <Group gap={"xs"} flex={1}>
        <CopyButton nft={nft} />
        {isOwner && <TransferNft nft={nft} openModal={openTransferModal} />}
        {isOwner && <DeleteButton nft={nft} />}
        <MenuButton nft={nft} />
      </Group>
    </Group>
  )
}

export default NftCardControls;