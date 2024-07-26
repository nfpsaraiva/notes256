import { Button, Group, Stack, TextInput, Textarea } from "@mantine/core";
import { FC, useState } from "react";
import { IconPlus } from "@tabler/icons-react";
import useCreateNote from "../../hooks/useCreateNote";
import { useNavigate } from "react-router-dom";

interface CreateNoteFormProps {
  modalOpened: boolean,
  closeModal: () => void,
}

const CreateNoteForm: FC<CreateNoteFormProps> = ({
  modalOpened,
  closeModal,
}: CreateNoteFormProps) => {
  const [name, setName] = useState('');

  const [description, setDescription] = useState('');
  const { createNote } = useCreateNote();
  const navigate = useNavigate();

  const save = async () => {
    await createNote(name, description);
    closeModal();
    navigate('/');
  }

  return (
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
        placeholder="Take a note"
        autosize
        maxLength={500}
        minRows={6}
        withAsterisk
      />
      <Group>
        <Button
          type="submit"
          leftSection={<IconPlus stroke={3} size={18} />}
          size="sm"
          radius={"lg"}
          variant="light"
          onClick={save}
        >
          Add
        </Button>
      </Group>
    </Stack>
  )
}

export default CreateNoteForm;