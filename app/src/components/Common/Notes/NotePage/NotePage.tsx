import { MainTitle } from "@/components/UI/MainTitle";
import { Stack } from "@mantine/core";
import { FC, ReactNode } from "react";
import NoteSearch from "../NoteSearch/NoteSearch";
import { IconRefresh } from "@tabler/icons-react";
import Loader from "../../Loader/Loader";
import NoteList from "../NoteList/NoteList";
import CreateNoteButton from "../CreateNoteButton/CreateNoteButton";
import CreateNoteModal from "../CreateNoteModal/CreateNoteModal";
import { AppShell } from "@/components/Layout";
import { BlockNote, LocalNote, WebNote } from "@/types";
import { filterNotes } from "@/utils/NotesUtils";

interface NotePageProps {
  pageTitle: string,
  pageSubtitle: string,
  userMenu: ReactNode,
  notes: LocalNote[] | WebNote[] | BlockNote[],
  createNote: (name: string, description: string) => Promise<void>,
  updateNote: (note: LocalNote | WebNote | BlockNote) => Promise<void>,
  deleteNote: (note: LocalNote | WebNote | BlockNote) => Promise<void>,
  createNoteModalOpened: boolean,
  createNoteModalHandle: {
    readonly open: () => void;
    readonly close: () => void;
    readonly toggle: () => void;
  },
  searchValue: string,
  setSearchValue: React.Dispatch<React.SetStateAction<string>>,
  searchValueDebounced: string
  isLoading: boolean,
  refetch: () => void,
  redirectAfterSubmit: string
}

const NotePage: FC<NotePageProps> = ({
  pageTitle,
  pageSubtitle,
  userMenu,
  notes,
  createNote,
  updateNote,
  deleteNote,
  createNoteModalOpened,
  createNoteModalHandle,
  searchValue,
  setSearchValue,
  searchValueDebounced,
  isLoading,
  refetch,
  redirectAfterSubmit
}: NotePageProps) => {
  return (
    <AppShell userMenu={userMenu}>
      <Stack gap={"xl"}>
        <MainTitle title={pageTitle} subtitle={pageSubtitle} />
        <NoteSearch
          searchValue={searchValue}
          setSearchValue={setSearchValue}
          submit={refetch}
          submitLabel="Refresh"
          submitIcon={<IconRefresh size={18} />}
        />
        {
          isLoading && <Loader />
        }
        {
          notes && <NoteList
            notes={filterNotes(notes, searchValueDebounced)}
            updateNote={updateNote}
            deleteNote={deleteNote}
          />
        }
        <CreateNoteButton open={createNoteModalHandle.open} />
        <CreateNoteModal
          opened={createNoteModalOpened}
          close={createNoteModalHandle.close}
          createNote={createNote}
          redirectAfterSubmit={redirectAfterSubmit}
        />
      </Stack>
    </AppShell>
  )
}

export default NotePage;