import { Note } from "@/types";
import { Button, Modal, ScrollArea, Stack } from "@mantine/core";
import { FC, useState } from "react";
import NoteContentEditable from "../NoteContentEditable/NoteContentEditable";
import { IconCheck } from "@tabler/icons-react";
import { useWeb3ModalAccount } from "@web3modal/ethers/react";
import { NoteType } from "@/enums";
import NoteContentViewable from "../NoteContentViewable/NoteContentViewable";

interface NoteCardExpandedProps {
  opened: boolean,
  close: () => void,
  note: Note,
  updateNote: (note: Note) => void,
  openNoteTransferForm: () => void,
  setLoadingNoteCard: React.Dispatch<React.SetStateAction<boolean>>,
}

const NoteCardExpanded: FC<NoteCardExpandedProps> = ({
  opened,
  close,
  note,
  updateNote,
  openNoteTransferForm,
  setLoadingNoteCard,
}: NoteCardExpandedProps) => {
  const [newTitle, setNewTitle] = useState(note.name);
  const [newDescription, setNewDescription] = useState(note.description);
  const { address } = useWeb3ModalAccount();

  const save = () => {
    updateNote({
      ...note,
      name: newTitle,
      description: newDescription
    });
    close();
  }

  return (
    <Modal
      radius={"xl"}
      size={"md"}
      padding={0}
      opened={opened}
      onClose={close}
      withCloseButton={false}
      scrollAreaComponent={ScrollArea.Autosize}
    >
      <Stack gap={"lg"} m={"lg"}>
        {
          note.type === NoteType.BLOCK && address !== note.owner
            ? <Stack>
              <NoteContentViewable
                note={note}
                newTitle={newTitle}
                newDescription={newDescription}
              />
            </Stack>
            : <Stack>
              <NoteContentEditable
                note={note}
                newTitle={newTitle}
                newDescription={newDescription}
                setNewTitle={setNewTitle}
                setNewDescription={setNewDescription}
                openNoteTransferForm={openNoteTransferForm}
                setLoadingNoteCard={setLoadingNoteCard}
                closeNoteCardExpanded={close}
              />
              <Button
                leftSection={<IconCheck stroke={3} size={18} />}
                size="sm"
                radius={"lg"}
                variant="filled"
                onClick={save}
                fw={700}
              >
                Save
              </Button>
            </Stack>
        }

      </Stack>
    </Modal>
  )
}

export default NoteCardExpanded;