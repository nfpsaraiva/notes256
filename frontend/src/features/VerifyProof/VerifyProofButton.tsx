import { ActionIcon, Button } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { FC } from "react";
import VerifyProofModal from "./VerifyProofModal";
import { IconCheck, IconSearch } from "@tabler/icons-react";

const VerifyProofButton: FC = () => {
  const [opened, { open, close }] = useDisclosure(false);

  return (
    <>
      <Button leftSection={<IconSearch size={16} />} size="xs" fw={700} onClick={open} visibleFrom="sm">Search</Button>
      <ActionIcon onClick={open} hiddenFrom="sm">
        <IconSearch />
      </ActionIcon>
      <VerifyProofModal opened={opened} close={close} />
    </>
  )
}

export default VerifyProofButton;