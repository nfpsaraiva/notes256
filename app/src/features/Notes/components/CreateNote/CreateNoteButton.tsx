import { ActionIcon, Affix, Button, Tooltip } from "@mantine/core";
import { FC } from "react";
import CreateNoteModal from "./CreateNoteModal";
import { useDisclosure } from "@mantine/hooks";
import { IconPlus } from "@tabler/icons-react";

const CreateNoteButton: FC = () => {
  const [opened, { open, close }] = useDisclosure(false);

  return (
    <>
      <Affix bottom={20} right={20}>
        <Tooltip label="New Note">
          <ActionIcon
            onClick={open}
            size={50}
            radius={"xl"}

          >
            <IconPlus size={26} stroke={3} />
          </ActionIcon>
        </Tooltip>
      </Affix>
      <CreateNoteModal opened={opened} close={close} />
    </>
  )
}

export default CreateNoteButton;