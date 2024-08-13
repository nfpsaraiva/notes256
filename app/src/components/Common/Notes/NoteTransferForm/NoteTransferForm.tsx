import { Note, TransferedNote } from "@/types";
import { Button, Modal, Stack, TextInput } from "@mantine/core";
import { FC, useState } from "react";

interface NoteTransferFormProps {
  opened: boolean,
  close: () => void,
  note: Note,
  transfer: (transferedNote: TransferedNote) => void,
  transfering: boolean,
}

const NoteTransferForm: FC<NoteTransferFormProps> = ({
  opened,
  close,
  note,
  transfer,
  transfering,
}: NoteTransferFormProps) => {
  const [to, setTo] = useState('');

  return (
    <Modal opened={opened} onClose={close} title="Transfer Note">
      <Stack>
        <TextInput
          placeholder="Destination address"
          value={to}
          onChange={e => setTo(e.target.value)}
        />
        {
          transfering
            ? <Button disabled>
              Transfering
            </Button>
            : <Button onClick={() => transfer({ note, to })}>
              Transfer
            </Button>
        }
      </Stack>
    </Modal>
  )
}

export default NoteTransferForm;