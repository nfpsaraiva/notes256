import { Modal } from "@mantine/core";
import { FC } from "react";
import CreateProofForm from "./CreateProofForm";

interface CreateProofModalProps {
  opened: boolean,
  close: () => void
}

const CreateProofModal: FC<CreateProofModalProps> = ({
  opened,
  close
}: CreateProofModalProps) => {
  return (
    <Modal opened={opened} onClose={close} title="Create Proof">
      <CreateProofForm closeModal={close} />
    </Modal>
  )
}

export default CreateProofModal;