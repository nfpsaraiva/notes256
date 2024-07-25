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
  return (
    <Modal radius={"lg"} opened={opened} withCloseButton={false} onClose={close}>
      <CreateNoteForm
        closeModal={close}
        modalOpened={opened}
      />
    </Modal>
  )
}

export default CreateNoteModal;