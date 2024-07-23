import { Proof } from "@/types";
import { Group } from "@mantine/core";
import { FC } from "react";
import DeleteButton from "./DeleteButton/DeleteButton";
import TransferProof from "./TransferButton/TransferButton";
import { useWeb3ModalAccount } from "@web3modal/ethers/react";
import { useProofOwner } from "@/hooks";
import CopyButton from "./CopyButton/CopyButton";
import OwnerButton from "./OwnerButton/OwnerButton";
import MenuButton from "./MenuButton/MenuButton";

interface ProofCardControlsProps {
  proof: Proof,
  openTransferModal: () => void
}

const ProofCardControls: FC<ProofCardControlsProps> = ({
  proof,
  openTransferModal
}: ProofCardControlsProps) => {
  const { address } = useWeb3ModalAccount();
  const { owner } = useProofOwner(proof);

  const isOwner = address === owner;

  return (
    <Group justify="space-between">
      <Group gap={"xs"} flex={1}>
        <CopyButton proof={proof} />
        {isOwner && <TransferProof proof={proof} openModal={openTransferModal} />}
        {isOwner && <DeleteButton proof={proof} />}
        <MenuButton proof={proof} />
      </Group>
      <Group>
        <OwnerButton proof={proof} />
      </Group>
    </Group>
  )
}

export default ProofCardControls;