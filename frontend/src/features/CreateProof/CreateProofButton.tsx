import { Button } from "@mantine/core";
import { FC } from "react";
import CreateProofModal from "./CreateProofModal";
import { useDisclosure } from "@mantine/hooks";

const CreateProofButton: FC = () => {
  const [opened, {open, close}] = useDisclosure(false);

  return (
    <>
      <Button miw={200} color='blue' onClick={open}>Create</Button>
      <CreateProofModal opened={opened} close={close} />
    </>
  )
}

export default CreateProofButton;