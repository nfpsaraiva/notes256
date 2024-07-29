import { Center, Loader } from "@mantine/core";
import { FC, ReactNode } from "react";
import NoteSearch from "../NoteSearch/NoteSearch";
import { IconRefresh } from "@tabler/icons-react";
import NoteList from "../NoteList/NoteList";
import CreateNoteButton from "../CreateNoteButton/CreateNoteButton";
import CreateNoteModal from "../CreateNoteModal/CreateNoteModal";
import { BlockNote, LocalNote, Note, WebNote } from "@/types";
import { filterNotes } from "@/utils/NotesUtils";
import { PageShell } from "@/components/UI";

interface NotePageProps {
  pageTitle: string,
  pageSubtitle: string,
  userMenu: ReactNode,
  notes: LocalNote[] | WebNote[] | BlockNote[],
  createNote: (name: string, description: string) => Promise<void>,
  updateNote: (note: Note) => Promise<void>,
  deleteNote: (note: Note) => Promise<void>,
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
  redirectAfterSubmit: string,
  noteMenu: ReactNode
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
  redirectAfterSubmit,
  noteMenu
}: NotePageProps) => {
  return (
    <PageShell title={pageTitle} subtitle={pageSubtitle} userMenu={userMenu}>
      <NoteSearch
        searchValue={searchValue}
        setSearchValue={setSearchValue}
        submit={refetch}
        submitLabel="Refresh"
        submitIcon={<IconRefresh size={18} />}
      />
      {
        isLoading &&
        <Center>
          <Loader type="bars" size={"xs"} />
        </Center>
      }
      {
        notes && <NoteList
          notes={filterNotes(notes, searchValueDebounced)}
          updateNote={updateNote}
          deleteNote={deleteNote}
          noteMenu={noteMenu}
        />
      }
      <CreateNoteButton open={createNoteModalHandle.open} />
      <CreateNoteModal
        opened={createNoteModalOpened}
        close={createNoteModalHandle.close}
        createNote={createNote}
        redirectAfterSubmit={redirectAfterSubmit}
      />
    </PageShell>
  )
}

export default NotePage;