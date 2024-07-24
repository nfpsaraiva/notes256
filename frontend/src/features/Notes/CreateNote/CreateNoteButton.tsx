import { Button } from "@mantine/core";
import { FC } from "react";
import CreateNoteModal from "./CreateNoteModal";
import { useDisclosure } from "@mantine/hooks";
import { IconPlus } from "@tabler/icons-react";

const CreateNoteButton: FC = () => {
  const [opened, { open, close }] = useDisclosure(false);

  return (
    <>
      <Button
        onClick={open}
        size="md"
        radius={"xl"}
        leftSection={<IconPlus size={18} stroke={3} />}
      >
        Add
      </Button>
      <CreateNoteModal opened={opened} close={close} />
    </>
  )
}

export default CreateNoteButton;