import { NotePage } from "@/components/Common/Notes";
import { UserMenu } from "@/components/WebNotes";
import { useWebNotes } from "@/hooks";
import { useDisclosure } from "@mantine/hooks";
import { FC, useState } from "react";

const WebNotes: FC = () => {
  const [searchValue, setSearchValue] = useState('');
  const { webNotes, isLoading, createWebNote, updateWebNote, deleteWebNote } = useWebNotes();
  const [createNoteModalOpened, createNoteModalHandle] = useDisclosure(false);

  const refetch = () => {};

  return (
    <NotePage
      pageTitle="Web Notes"
      pageSubtitle="Notes will be linked to your current accoun"
      createNote={createWebNote}
      createNoteModalHandle={createNoteModalHandle}
      createNoteModalOpened={createNoteModalOpened}
      deleteNote={deleteWebNote}
      isLoading={isLoading}
      notes={webNotes ? webNotes : []}
      refetch={refetch}
      searchValue={searchValue}
      setSearchValue={setSearchValue}
      updateNote={updateWebNote}
      userMenu={<UserMenu />}
      redirectAfterSubmit="/"
    />
  )
}

export default WebNotes;