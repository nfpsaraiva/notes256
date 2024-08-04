import { ActionIcon, Affix, Tooltip } from "@mantine/core";
import { FC } from "react";
import { IconPlus } from "@tabler/icons-react";
import { useDisclosure } from "@mantine/hooks";
import CreateNoteForm from "../CreateNoteForm/CreateNoteForm";

interface CreateNoteButtonProps {
  createNote: (name: string, description: string) => Promise<void>,
}

const CreateNoteButton: FC<CreateNoteButtonProps> = ({
  createNote,
}: CreateNoteButtonProps) => {
  const [opened, {open, close}] = useDisclosure(false);

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
      <CreateNoteForm
        opened={opened}
        close={close}
        createNote={createNote}
      />
    </>
  )
}

export default CreateNoteButton;