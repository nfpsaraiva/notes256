import { Button, Stack, TextInput, Textarea } from "@mantine/core";
import { FC, useState } from "react";
import { IconFile } from "@tabler/icons-react";
import useCreateNote from "../../hooks/useCreateNote";
import { useNavigate } from "react-router-dom";

interface CreateNoteFormProps {
  modalOpened: boolean,
  closeModal: () => void,
  name: string,
  setName: React.Dispatch<React.SetStateAction<string>>
  description: string,
  setDescription: React.Dispatch<React.SetStateAction<string>>
}

const CreateNoteForm: FC<CreateNoteFormProps> = ({
  modalOpened,
  closeModal,
  name,
  setName,
  description,
  setDescription
}: CreateNoteFormProps) => {
  const { createNote } = useCreateNote();
  const navigate = useNavigate();

  const save = async () => {
    createNote(name, description);
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
        <Button
          type="submit"
          leftSection={<IconFile size={18} />}
          size="sm"
          radius={"lg"}
          variant="subtle"
          onClick={save}
        >
          Save
        </Button>
      </Stack>
  )
}

export default CreateNoteForm;