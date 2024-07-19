import { Button } from "@mantine/core";
import { FC } from "react";
import CreateProofModal from "./CreateProofModal";
import { useDisclosure } from "@mantine/hooks";
import { IconPlus } from "@tabler/icons-react";

const CreateProofButton: FC = () => {
  const [opened, { open, close }] = useDisclosure(false);

  return (
    <>
      <Button
        onClick={open}
        size="md"
        radius={"lg"}
        leftSection={<IconPlus size={18} stroke={3} />}
      >
        Add
      </Button>
      <CreateProofModal opened={opened} close={close} />
    </>
  )
}

export default CreateProofButton;