import { Center, Loader } from "@mantine/core";
import { FC, ReactNode } from "react";
import NoteSearch from "../NoteSearch/NoteSearch";
import { IconRefresh } from "@tabler/icons-react";
import NoteCardsList from "../NoteCardsList/NoteCardsList";
import CreateNoteButton from "../CreateNoteButton/CreateNoteButton";
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
  searchValue: string,
  setSearchValue: React.Dispatch<React.SetStateAction<string>>,
  searchValueDebounced: string
  isLoading: boolean,
  refetch: () => void,
  noteMenuIcon: ReactNode
}

const NotePage: FC<NotePageProps> = ({
  pageTitle,
  pageSubtitle,
  userMenu,
  notes,
  createNote,
  updateNote,
  searchValue,
  setSearchValue,
  searchValueDebounced,
  isLoading,
  refetch,
  noteMenuIcon
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
        notes && <NoteCardsList
          notes={filterNotes(notes, searchValueDebounced)}
          updateNote={updateNote}
          noteMenuIcon={noteMenuIcon}
        />
      }
      <CreateNoteButton
        createNote={createNote}
      />

    </PageShell>
  )
}

export default NotePage;