import { Button, Modal, Stack, Textarea, TextInput } from "@mantine/core";
import { FC, useState } from "react";
import { IconCheck } from "@tabler/icons-react";

interface CreateNoteFormProps {
  opened: boolean,
  close: () => void,
  createNote: (name: string, description: string) => Promise<void>,
}

const CreateNoteForm: FC<CreateNoteFormProps> = ({
  opened,
  close,
  createNote,
}: CreateNoteFormProps) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');

  const save = async () => {
    await createNote(
      name,
      description
    );
    close();
  }

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
        <Button
          leftSection={<IconCheck stroke={3} size={18} />}
          size="sm"
          radius={"lg"}
          variant="light"
          onClick={save}
          fw={700}
        >
          Save
        </Button>
      </Stack>
    </Modal>
  )
}

export default CreateNoteForm;