import { Modal } from "@mantine/core";
import { FC } from "react";
import CreateNoteForm from "../CreateNoteForm/CreateNoteForm";
import { BlockNote, LocalNote, WebNote } from "@/types";

interface CreateNoteModalProps {
  opened: boolean,
  close: () => void,
  createNote: (name: string, description: string) => Promise<void>,
  redirectAfterSubmit: string
}

const CreateNoteModal: FC<CreateNoteModalProps> = ({
  opened,
  close,
  createNote,
  redirectAfterSubmit
}: CreateNoteModalProps) => {
  return (
    <Modal radius={"lg"} opened={opened} withCloseButton={false} onClose={close}>
      <CreateNoteForm
        closeModal={close}
        modalOpened={opened}
        createNote={createNote}
        redirectAfterSubmit={redirectAfterSubmit}
      />
    </Modal>
  )
}

export default CreateNoteModal;