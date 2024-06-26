import { Button } from "@mantine/core";
import { FC } from "react";
import CreateProofModal from "./CreateProofModal";
import { useDisclosure } from "@mantine/hooks";
import { IconCertificate, IconPlus } from "@tabler/icons-react";

const CreateProofButton: FC = () => {
  const [opened, {open, close}] = useDisclosure(false);

  return (
    <>
      <Button leftSection={<IconCertificate />} miw={200} fw={700} size="md" color='blue' onClick={open}>Create</Button>
      <CreateProofModal opened={opened} close={close} />
    </>
  )
}

export default CreateProofButton;