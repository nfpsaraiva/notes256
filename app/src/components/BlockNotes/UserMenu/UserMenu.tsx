import { Button, Group, Menu } from "@mantine/core";
import { FC } from "react";
import { useWeb3Modal, useWeb3ModalAccount } from "@web3modal/ethers/react";
import { IconCube, IconGizmo, IconWallet } from "@tabler/icons-react";
import { shortifyAddress } from "@/utils/NotesUtils";

const UserMenu: FC = () => {
  const { isConnected, address } = useWeb3ModalAccount();
  const { open } = useWeb3Modal();

  return (
    isConnected
      ? (
        <Group wrap="nowrap" gap={0}>
          <Button
            component="a"
            variant="subtle"
            onClick={() => open()}
            leftSection={<IconCube size={16} />}
          >
            {shortifyAddress(address as string)}
          </Button>

        </Group>
      )
      : <Button
        radius={"lg"}
        leftSection={<IconWallet size={20} />}
        onClick={() => open()}
        size='sm'
      >
        Connect Wallet
      </Button>
  )
}

export default UserMenu;