import { Modal } from "@mantine/core";
import { FC } from "react";

interface SearchProofModalProps {
  opened: boolean,
  close: () => void
}

const SearchProofModal: FC<SearchProofModalProps> = ({
  opened,
  close
}: SearchProofModalProps) => {
  return (
    <Modal opened={opened} onClose={close} title="Search Proof">
      sdafsdf
    </Modal>
  )
}

export default SearchProofModal;