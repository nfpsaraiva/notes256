import { Button, Group } from "@mantine/core";
import { FC } from "react";
import { useWeb3Modal, useWeb3ModalAccount } from "@web3modal/ethers/react";
import { IconWallet } from "@tabler/icons-react";
import { shortifyAddress } from "@/utils/NotesUtils";
import NoteIcon from "../NoteIcon/NoteIcon";

const UserMenu: FC = () => {
  const { isConnected, address } = useWeb3ModalAccount();
  const { open } = useWeb3Modal();

  return (
    isConnected
      ? (
          <Button
            fw={700}
            radius={"xl"}
            size="md"
            component="a"
            variant="subtle"
            onClick={() => open()}
            leftSection={<NoteIcon size={20} />}
          >
            {shortifyAddress(address as string)}
          </Button>
      )
      : <Button
        radius={"xl"}
        leftSection={<IconWallet size={20} />}
        onClick={() => open()}
        size='sm'
      >
        Connect Wallet
      </Button>
  )
}

export default UserMenu;