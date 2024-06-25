import { Modal } from "@mantine/core";
import { FC } from "react";

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
      Create proof modal
    </Modal>
  )
}

export default CreateProofModal;