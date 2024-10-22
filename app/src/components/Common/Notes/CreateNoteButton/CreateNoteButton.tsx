import { ActionIcon, Affix, Tooltip } from "@mantine/core";
import { FC } from "react";
import { IconPlus } from "@tabler/icons-react";
import { useDisclosure } from "@mantine/hooks";
import CreateNoteForm from "../CreateNoteForm/CreateNoteForm";
import { NewNote } from "@/types";

interface CreateNoteButtonProps {
  createNote: (newNote: NewNote) => void,
  creatingNote: boolean
}

const CreateNoteButton: FC<CreateNoteButtonProps> = ({
  createNote,
  creatingNote,
}: CreateNoteButtonProps) => {
  const [opened, {open, close}] = useDisclosure(false);

  return (
    <>
      <Affix bottom={20} right={20} zIndex={1}>
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
        creatingNote={creatingNote}
      />
    </>
  )
}

export default CreateNoteButton;