import { ActionIcon, Menu } from "@mantine/core";
import { IconDotsVertical, IconExternalLink } from "@tabler/icons-react";
import { FC } from "react";
import envs from "@/envs";
import { Draft } from "@/types";

interface MenuButtonProps {
  Draft: Draft
}

const MenuButton: FC<MenuButtonProps> = ({ Draft }: MenuButtonProps) => {
  const { CHAIN_ETHERSCAN_URL, CONTRACT_ADDRESS } = envs;

  return (
    <Menu position="top">
      <Menu.Target>
        <ActionIcon onClick={e => e.stopPropagation()} variant="subtle">
          <IconDotsVertical size={18} />
        </ActionIcon>
      </Menu.Target>
      <Menu.Dropdown>
        <Menu.Item
          leftSection={<IconExternalLink size={16} />}
          component="a"
          target="_blank"
          href={`${CHAIN_ETHERSCAN_URL}/token/${CONTRACT_ADDRESS}?a=${Draft.tokenId}`}
        >
          Blockchain Explorer
        </Menu.Item>
      </Menu.Dropdown>
    </Menu>
  )
}

export default MenuButton;