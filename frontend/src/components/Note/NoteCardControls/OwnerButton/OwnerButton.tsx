import { Note } from "@/types";
import { shortifyAddress } from "@/utils/noteUtils";
import { Badge, CopyButton, Tooltip } from "@mantine/core";
import { useWeb3ModalAccount } from "@web3modal/ethers/react";
import { FC } from "react";

interface OwnerButtonProps {
  note: Note
}

const OwnerButton: FC<OwnerButtonProps> = ({ note }: OwnerButtonProps) => {
  const { address } = useWeb3ModalAccount();

  return (
    <CopyButton value={note.owner} timeout={2000}>
      {({ copied, copy }) => (
        <Tooltip label={copied ? 'Copied' : 'Copy Owner'} withArrow>
          <Badge flex={1} size="sm" variant={note.owner === address ? 'light' : 'outline'} style={{ cursor: "pointer" }} onClick={e => {
            e.stopPropagation();
            copy();
          }}>
            {
              copied ? 'Copyed' : shortifyAddress(note.owner)
            }
          </Badge>
        </Tooltip>
      )}
    </CopyButton>
  )
}

export default OwnerButton;