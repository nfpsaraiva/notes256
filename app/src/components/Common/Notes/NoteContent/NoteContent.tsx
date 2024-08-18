import { Note } from "@/types";
import { Badge, Group, Stack, Text, Title } from "@mantine/core";
import { FC, ReactNode } from "react";
import NoteMenu from "../NoteMenu/NoteMenu";

interface NoteContentProps {
  note: Note,
  expanded: boolean,
  openNoteTransferForm: () => void,
  setLoadingNoteCard: React.Dispatch<React.SetStateAction<boolean>>,
  closeNoteCardExpanded: () => void,
  openAddToWallet: () => void
}

const NoteContent: FC<NoteContentProps> = ({
  note,
  expanded = false,
  openNoteTransferForm,
  setLoadingNoteCard,
  closeNoteCardExpanded,
  openAddToWallet
}: NoteContentProps) => {
  const formatedDate = <Text c={"dimmed"} size="xs" fw={500}>
    {
      new Date(note.date).toLocaleDateString() + " " + new Date(note.date).toLocaleTimeString()
    }
  </Text>

  return (
    <Stack gap={"xs"} h={"100%"} mb={0}>
      <Stack gap={2}>
        <Group justify="space-between" wrap="nowrap" align="flex-start">
          <Stack gap={"md"} flex={1}>
            <Group justify="space-between">
              <Badge size="sm" variant="transparent" px={0}>
                {note.type}
              </Badge>
              <NoteMenu
                note={note}
                openNoteTransferForm={openNoteTransferForm}
                setLoadingNoteCard={setLoadingNoteCard}
                closeNoteCardExpanded={closeNoteCardExpanded}
                openAddToWallet={openAddToWallet}
              />
            </Group>
            {
              note.name !== "" &&
              <Title order={3} fw={600} size={"h4"} lineClamp={expanded ? 3 : 2}>{note.name}</Title>
            }
          </Stack>
        </Group>
      </Stack>
      <Text fw={400} lineClamp={5} size="sm" lh={1.6}>
        {note.description}
      </Text>
    </Stack>
  )
}

export default NoteContent;