import { Button } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { FC } from "react";
import VerifyProofModal from "./VerifyProofModal";
import { IconCheck } from "@tabler/icons-react";

const VerifyProofButton: FC = () => {
  const [opened, { open, close }] = useDisclosure(false);

  return (
    <>
      <Button color="var(--mantine-color-provify-light-blue-9)" leftSection={<IconCheck size={16} stroke={3} />} fw={700} onClick={open}>
        Verify Proof
      </Button>
      <VerifyProofModal opened={opened} close={close} />
    </>
  )
}

export default VerifyProofButton;