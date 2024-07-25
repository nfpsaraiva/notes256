import { Modal } from "@mantine/core";
import { FC, useState } from "react";
import CreateNoteForm from "./CreateNoteForm";
import { useCreateNote } from "../../hooks";

interface CreateNoteModalProps {
  opened: boolean,
  close: () => void
}

const CreateNoteModal: FC<CreateNoteModalProps> = ({
  opened,
  close
}: CreateNoteModalProps) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const {createNote} = useCreateNote();

  const closeModal = () => {
    createNote(name, description);
    close();
  }

  return (
    <Modal radius={"lg"} opened={opened} withCloseButton={false} onClose={closeModal}>
      <CreateNoteForm
        closeModal={closeModal}
        modalOpened={opened}
        name={name}
        setName={setName}
        description={description}
        setDescription={setDescription}

      />
    </Modal>
  )
}

export default CreateNoteModal;