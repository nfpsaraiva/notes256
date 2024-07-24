import { Modal } from "@mantine/core";
import { FC } from "react";
import CreateNoteForm from "./CreateNoteForm";

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
      <CreateNoteForm closeModal={close} modalOpened={opened} />
    </Modal>
  )
}

export default CreateNoteModal;