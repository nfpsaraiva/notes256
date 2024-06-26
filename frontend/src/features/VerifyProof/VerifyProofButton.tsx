import { Button } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { FC } from "react";
import VerifyProofModal from "./VerifyProofModal";
import { IconCheck } from "@tabler/icons-react";

const VerifyProofButton: FC = () => {
  const [opened, { open, close }] = useDisclosure(false);

  return (
    <>
      <Button leftSection={<IconCheck />} size="md" fw={700} miw={200} onClick={open}>Verify</Button>
      <VerifyProofModal opened={opened} close={close} />
    </>
  )
}

export default VerifyProofButton;