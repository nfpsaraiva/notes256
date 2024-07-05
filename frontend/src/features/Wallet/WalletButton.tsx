import { Button } from "@mantine/core";
import { FC } from "react";
import { useWeb3Modal, useWeb3ModalAccount } from "@web3modal/ethers/react";
import { IconWallet } from "@tabler/icons-react";

const WalletButton: FC = () => {
  const { isConnected, address } = useWeb3ModalAccount();
  const { open } = useWeb3Modal();

  return (
    isConnected
      ? <w3m-button balance="hide" size='sm' />
      : (
        <>
          <Button leftSection={<IconWallet size={20} />} onClick={() => open()} size='sm' visibleFrom="sm">Connect Wallet</Button>
          <Button leftSection={<IconWallet size={18} />} onClick={() => open()} size='xs' hiddenFrom="sm">Connect Wallet</Button>
        </>
      )
  )
}

export default WalletButton;