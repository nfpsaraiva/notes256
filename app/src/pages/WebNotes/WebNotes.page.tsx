import { Loader } from "@/components/Common";
import { CreateNoteButton, CreateNoteModal, NoteList, NoteSearch } from "@/components/Common/Notes";
import { AppShell } from "@/components/Layout";
import { MainTitle } from "@/components/UI/MainTitle";
import { UserMenu } from "@/components/WebNotes";
import { useWebNotes } from "@/hooks";
import { filterNotes } from "@/utils/NotesUtils";
import { Stack } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { FC, useState } from "react";

const WebNotes: FC = () => {
  const [searchValue, setSearchValue] = useState('');
  const { webNotes, isLoading, createWebNote, updateWebNote, deleteWebNote } = useWebNotes();
  const [createNoteModalOpened, createNoteModalHandle] = useDisclosure(false);

  return (
    <AppShell userMenu={<UserMenu />}>
      <Stack gap={"xl"}>
        <MainTitle title="Web Notes" subtitle="Notes will be linked to your current account" />
        <NoteSearch
          searchValue={searchValue}
          setSearchValue={setSearchValue}
        />
        {
          isLoading && <Loader />
        }
        {
          webNotes && <NoteList
            notes={filterNotes(webNotes, searchValue)}
            updateNote={updateWebNote}
            deleteNote={deleteWebNote}
          />
        }
        <CreateNoteButton open={createNoteModalHandle.open} />
        <CreateNoteModal
          opened={createNoteModalOpened}
          close={createNoteModalHandle.close}
          createNote={createWebNote}
          redirectAfterSubmit="/"
        />
      </Stack>
    </AppShell>
  )
}

export default WebNotes;