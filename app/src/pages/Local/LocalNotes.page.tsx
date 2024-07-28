import { CreateNoteButton, CreateNoteModal, NoteList, NoteSearch } from "@/components/Common/Notes";
import { AppShell } from "@/components/Layout";
import { UserMenu } from "@/components/LocalNotes";
import { MainTitle } from "@/components/UI/MainTitle";
import { useLocalNotes } from "@/hooks";
import { filterNotes } from "@/utils/NotesUtils";
import { Box, Group, Stack } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { FC, useState } from "react";

const LocalNotes: FC = () => {
  const [searchValue, setSearchValue] = useState('');
  const { localNotes, createLocalNote, updateLocalNote, deleteLocalNote } = useLocalNotes();
  const [createNoteModalOpened, createNoteModalHandle] = useDisclosure(false);

  return (
    <AppShell userMenu={<UserMenu />}>
      <Stack gap={"xl"}>
        <Group justify="space-between" align="center" wrap="nowrap">
          <Box flex={1}>
            <MainTitle title="Local Notes" subtitle="Notes will only be saved on your device" />
          </Box>
        </Group>
        <NoteSearch
          searchValue={searchValue}
          setSearchValue={setSearchValue}
        />
        {
          localNotes &&
          <NoteList
            notes={filterNotes(localNotes, searchValue)}
            updateNote={updateLocalNote}
            deleteNote={deleteLocalNote}
          />
        }
        <CreateNoteButton open={createNoteModalHandle.open} />
        <CreateNoteModal
          opened={createNoteModalOpened}
          close={createNoteModalHandle.close}
          createNote={createLocalNote}
          redirectAfterSubmit="/local-notes"
        />
      </Stack>
    </AppShell>
  )
}

export default LocalNotes;