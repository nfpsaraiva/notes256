import { Proof } from "@/types";
import { Group } from "@mantine/core";
import { FC } from "react";
import DeleteButton from "./DeleteButton/DeleteButton";
import CopyButton from "./CopyButton/CopyButton";
import TransferProof from "./TransferButton/TransferButton";
import { useWeb3ModalAccount } from "@web3modal/ethers/react";
import { useProofByOwner, useProofOwner } from "@/hooks";

interface ProofCardControlsProps {
  proof: Proof
}

const ProofCardControls: FC<ProofCardControlsProps> = ({
  proof
}: ProofCardControlsProps) => {
  const { address } = useWeb3ModalAccount();
  const { owner } = useProofOwner(proof);

  const isOwner = address === owner;

  return (
    <Group justify="space-between">
      <Group gap={"xs"}>
        <CopyButton proof={proof} />
        {isOwner && <TransferProof proof={proof} />}
      </Group>
      {isOwner && <DeleteButton proof={proof} />}
    </Group>
  )
}

export default ProofCardControls;