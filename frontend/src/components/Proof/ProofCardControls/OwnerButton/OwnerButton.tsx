import { useProofOwner } from "@/hooks";
import { Proof } from "@/types";
import { shortifyAddress } from "@/utils/proofUtils";
import { Badge, CopyButton, Tooltip } from "@mantine/core";
import { useWeb3ModalAccount } from "@web3modal/ethers/react";
import { FC } from "react";

interface OwnerButtonProps {
  proof: Proof
}

const OwnerButton: FC<OwnerButtonProps> = ({ proof }: OwnerButtonProps) => {
  const { address } = useWeb3ModalAccount();
  const { owner } = useProofOwner(proof);

  if (!owner) return <></>;

  return (
    <CopyButton value={owner} timeout={2000}>
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
    </CopyButton>
  )
}

export default OwnerButton;