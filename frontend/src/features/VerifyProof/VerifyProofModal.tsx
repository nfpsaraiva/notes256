import { Modal } from "@mantine/core"
import { FC } from "react"
import VerifyProofForm from "./VerifyProofForm"

interface VerifyProofModalProps {
  opened: boolean,
  close: () => void
}

const VerifyProofModal: FC<VerifyProofModalProps> = ({
  opened,
  close
}: VerifyProofModalProps) => {
  return (
    <Modal opened={opened} onClose={close} title="Verify Proof">
      <VerifyProofForm closeModal={close} />
    </Modal>
  )
}

export default VerifyProofModal;