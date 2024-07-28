import { Button, Group, Menu } from "@mantine/core";
import { FC } from "react";
import { useWeb3Modal, useWeb3ModalAccount } from "@web3modal/ethers/react";
import { IconWallet } from "@tabler/icons-react";

const WalletButton: FC = () => {
  const { isConnected, address } = useWeb3ModalAccount();
  const { open } = useWeb3Modal();


  return (
    isConnected
      ? (
        <Group wrap="nowrap" gap={0}>
          <Menu>
            <Menu.Target>
              <Menu.Item>
                <Button variant="outline" radius={"lg"} size="xs">Sepolia</Button>
              </Menu.Item>
            </Menu.Target>
          </Menu>
          <w3m-button balance="hide" size='sm' />
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

export default WalletButton;