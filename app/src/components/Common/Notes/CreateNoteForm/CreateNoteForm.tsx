import { Button, Stack, TextInput, Textarea } from "@mantine/core";
import { FC, useState } from "react";
import { IconPlus } from "@tabler/icons-react";
import { useNavigate } from "react-router-dom";

interface CreateNoteFormProps {
  modalOpened: boolean,
  closeModal: () => void,
  createNote: (name: string, description: string) => Promise<void>,
  redirectAfterSubmit: string
}

const CreateNoteForm: FC<CreateNoteFormProps> = ({
  modalOpened,
  closeModal,
  createNote,
  redirectAfterSubmit
}: CreateNoteFormProps) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const navigate = useNavigate();

  const save = async () => {
    await createNote(
      name,
      description
    );
    closeModal();
    navigate(redirectAfterSubmit);
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
        placeholder="Take a localNote"
        autosize
        maxLength={500}
        minRows={6}
        withAsterisk
      />
      <Button
        leftSection={<IconPlus stroke={3} size={18} />}
        size="sm"
        radius={"lg"}
        variant="light"
        onClick={save}
        fw={700}
      >
        Add
      </Button>
    </Stack>
  )
}

export default CreateNoteForm;