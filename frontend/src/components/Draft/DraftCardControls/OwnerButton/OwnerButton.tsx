import { useDraftOwner } from "@/hooks";
import { Draft } from "@/types";
import { shortifyAddress } from "@/utils/DraftUtils";
import { Badge, CopyButton, Tooltip } from "@mantine/core";
import { useWeb3ModalAccount } from "@web3modal/ethers/react";
import { FC } from "react";

interface OwnerButtonProps {
  Draft: Draft
}

const OwnerButton: FC<OwnerButtonProps> = ({ Draft }: OwnerButtonProps) => {
  const { address } = useWeb3ModalAccount();
  const { owner } = useDraftOwner(Draft);

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