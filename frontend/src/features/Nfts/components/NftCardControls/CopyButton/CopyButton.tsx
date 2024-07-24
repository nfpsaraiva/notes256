import { Nft } from "@/types";
import { ActionIcon, Tooltip, CopyButton as MantineCopyButton } from "@mantine/core";
import { IconCheck, IconCopy } from "@tabler/icons-react";
import { FC } from "react";

interface CopyButtonProps {
  nft: Nft
}

const CopyButton: FC<CopyButtonProps> = ({ nft }: CopyButtonProps) => {
  return (
    <MantineCopyButton value={nft.id}>
      {({ copied, copy }) => (
        <Tooltip label={copied ? 'Copied' : 'Copy ID'} withArrow>
          <ActionIcon variant="subtle" size={"lg"} onClick={e => {
            e.stopPropagation();
            copy();
          }}>
            {
              copied
                ? <IconCheck size={16} />
                : <IconCopy size={16} />
            }
          </ActionIcon>
        </Tooltip>
      )}
    </MantineCopyButton>
  )
}

export default CopyButton;