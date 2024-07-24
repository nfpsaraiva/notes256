import { shortifyAddress } from "@/features/Nfts/utils/nftUtils";
import { Nft } from "@/types";
import { Badge, CopyButton, Tooltip } from "@mantine/core";
import { useWeb3ModalAccount } from "@web3modal/ethers/react";
import { FC } from "react";

interface OwnerButtonProps {
  nft: Nft
}

const OwnerButton: FC<OwnerButtonProps> = ({ nft }: OwnerButtonProps) => {
  const { address } = useWeb3ModalAccount();

  return (
    <CopyButton value={nft.owner} timeout={2000}>
      {({ copied, copy }) => (
        <Tooltip label={copied ? 'Copied' : 'Copy Owner'} withArrow>
          <Badge flex={1} size="sm" variant={nft.owner === address ? 'light' : 'outline'} style={{ cursor: "pointer" }} onClick={e => {
            e.stopPropagation();
            copy();
          }}>
            {
              copied ? 'Copyed' : shortifyAddress(nft.owner)
            }
          </Badge>
        </Tooltip>
      )}
    </CopyButton>
  )
}

export default OwnerButton;