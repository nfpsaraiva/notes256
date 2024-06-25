import { Modal } from "@mantine/core"
import { FC } from "react"

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
      Verify Modal
    </Modal>
  )
}

export default VerifyProofModal;