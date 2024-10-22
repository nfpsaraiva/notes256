import { Button, Modal, Stack, Textarea, TextInput } from "@mantine/core";
import { FC, useEffect, useState } from "react";
import { IconCheck } from "@tabler/icons-react";
import NewNote from "@/types/NewNote";

interface CreateNoteFormProps {
  opened: boolean,
  close: () => void,
  createNote: (newNote: NewNote) => void,
  creatingNote: boolean
}

const CreateNoteForm: FC<CreateNoteFormProps> = ({
  opened,
  close,
  createNote,
  creatingNote,
}: CreateNoteFormProps) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');

  const save = async () => {
    await createNote({ name, description });
  }

  useEffect(() => {
    if (!creatingNote) close();
  }, [creatingNote])

  return (
    <Modal radius={"lg"} opened={opened} withCloseButton={false} onClose={close}>
      <Stack gap={"xl"}>
        <TextInput
          withAsterisk
          value={name}
          onChange={e => setName(e.target.value)}
          variant="unstyled"
          placeholder="Name"
        />
        <Textarea
          variant="unstyled"
          value={description}
          onChange={e => setDescription(e.target.value)}
          placeholder="Take a localNote"
          autosize
          maxLength={500}
          minRows={6}
          withAsterisk
        />
        {
          creatingNote
            ? <Button
              leftSection={<IconCheck stroke={3} size={18} />}
              size="sm"
              radius={"lg"}
              variant="filled"
              disabled
              fw={700}
            >
              Saving
            </Button>
            : <Button
              leftSection={<IconCheck stroke={3} size={18} />}
              size="sm"
              radius={"lg"}
              variant="filled"
              onClick={save}
              fw={700}
            >
              Save
            </Button>
        }
      </Stack>
    </Modal>
  )
}

export default CreateNoteForm;