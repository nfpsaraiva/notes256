import { ActionIcon, Button, Center } from "@mantine/core";
import { FC } from "react";
import { useWeb3Modal, useWeb3ModalAccount } from "@web3modal/ethers/react";
import { IconWallet } from "@tabler/icons-react";

const WalletButton: FC = () => {
  const { isConnected } = useWeb3ModalAccount();
  const { open } = useWeb3Modal();

  return (
    isConnected
      ? <Center><w3m-button size='sm' /></Center>
      : (
        <>
          <Button visibleFrom="sm" onClick={() => open()} size='sm'>Connect Wallet</Button>
          <ActionIcon hiddenFrom="sm" size={"lg"} onClick={() => open()}>
            <IconWallet size={22} />
          </ActionIcon>
        </>
      )
  )
}

export default WalletButton;