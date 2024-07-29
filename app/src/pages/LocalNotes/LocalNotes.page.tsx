import { NotePage } from "@/components/Common/Notes";
import { UserMenu } from "@/components/LocalNotes";
import { useLocalNotes } from "@/hooks";
import { useDisclosure } from "@mantine/hooks";
import { FC, useState } from "react";

const LocalNotes: FC = () => {
  const [searchValue, setSearchValue] = useState('');
  const { localNotes, createLocalNote, updateLocalNote, deleteLocalNote } = useLocalNotes();
  const [createNoteModalOpened, createNoteModalHandle] = useDisclosure(false);

  const refetch = () => {};

  return (
    <NotePage
      pageTitle="Local Notes"
      pageSubtitle="Notes will only be saved on your device"
      createNote={createLocalNote}
      createNoteModalHandle={createNoteModalHandle}
      createNoteModalOpened={createNoteModalOpened}
      deleteNote={deleteLocalNote}
      isLoading={false}
      notes={localNotes}
      refetch={refetch}
      searchValue={searchValue}
      setSearchValue={setSearchValue}
      searchValueDebounced={searchValue}
      updateNote={updateLocalNote}
      userMenu={<UserMenu />}
      redirectAfterSubmit="/local-notes"
    />
  )
}

export default LocalNotes;