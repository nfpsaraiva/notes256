import { Center, Loader } from "@mantine/core";
import { FC, ReactNode } from "react";
import NoteSearch from "../NoteSearch/NoteSearch";
import { IconRefresh } from "@tabler/icons-react";
import NoteCardsList from "../NoteCardsList/NoteCardsList";
import CreateNoteButton from "../CreateNoteButton/CreateNoteButton";
import { BlockNote, LocalNote, NewNote, Note, TransferedNote, WebNote } from "@/types";
import { filterNotes } from "@/utils/NotesUtils";
import { PageShell } from "@/components/UI";

interface NotePageProps {
  pageTitle: string,
  pageSubtitle: string,
  userMenu: ReactNode,
  notes: LocalNote[] | WebNote[] | BlockNote[],
  createNote: (newNote: NewNote) => void,
  creatingNote: boolean,
  updateNote: (note: Note) => void,
  searchValue: string,
  setSearchValue: React.Dispatch<React.SetStateAction<string>>,
  searchValueDebounced: string,
  searchPlaceholder?: string,
  isLoading: boolean,
  refetch: () => void,
  isConnected: boolean,
  transfer: (transferedNote: TransferedNote) => void,
  transfering: boolean,
}

const NotePage: FC<NotePageProps> = ({
  pageTitle,
  pageSubtitle,
  userMenu,
  notes,
  createNote,
  creatingNote,
  updateNote,
  searchValue,
  setSearchValue,
  searchValueDebounced,
  searchPlaceholder,
  isLoading,
  refetch,
  isConnected,
  transfer,
  transfering,
}: NotePageProps) => {
  return (
    <PageShell title={pageTitle} subtitle={pageSubtitle} userMenu={userMenu}>
      <NoteSearch
        searchValue={searchValue}
        setSearchValue={setSearchValue}
        placeholder={searchPlaceholder}
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
          transfer={transfer}
          transfering={transfering}
        />
      }
      {
        isConnected &&
        <CreateNoteButton
          createNote={createNote}
          creatingNote={creatingNote}
        />
      }
    </PageShell>
  )
}

export default NotePage;