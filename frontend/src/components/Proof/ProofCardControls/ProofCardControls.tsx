import { Proof } from "@/types";
import { Badge, CopyButton as MantineCopyButton, Group, Tooltip } from "@mantine/core";
import { FC } from "react";
import DeleteButton from "./DeleteButton/DeleteButton";
import TransferProof from "./TransferButton/TransferButton";
import { useWeb3ModalAccount } from "@web3modal/ethers/react";
import { useProofByOwner, useProofOwner } from "@/hooks";
import { shortifyAddress } from "@/utils/proofUtils";
import CopyButton from "./CopyButton/CopyButton";

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
      <Group gap={"xs"} flex={1}>
        <CopyButton proof={proof} />
        {isOwner && <TransferProof proof={proof} />}
        {isOwner && <DeleteButton proof={proof} />}
      </Group>
      <Group>
        {
          owner &&
          <MantineCopyButton value={owner} timeout={2000}>
            {({ copied, copy }) => (
              <Tooltip label={copied ? 'Copied' : 'Copy Owner'} withArrow>
                <Badge flex={1} size="sm" variant={owner === address ? 'light' : 'outline'} style={{ cursor: "pointer" }} onClick={e => {
                  e.stopPropagation();
                  copy();
                }}>
                  {
                    copied ? 'Copyed' : shortifyAddress(owner)
                  }
                </Badge>
              </Tooltip>
            )}
          </MantineCopyButton>
        }
      </Group>
    </Group>
  )
}

export default ProofCardControls;