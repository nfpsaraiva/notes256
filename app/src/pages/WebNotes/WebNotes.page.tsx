import { NotePage } from "@/components/Common/Notes";
import { UserMenu } from "@/components/WebNotes";
import { useWebNotes } from "@/hooks";
import { useDisclosure } from "@mantine/hooks";
import { IconCloud } from "@tabler/icons-react";
import { FC, useState } from "react";

const WebNotes: FC = () => {
  const [searchValue, setSearchValue] = useState('');
  const { webNotes, isLoading, createNote, updateNote } = useWebNotes();
  const [createNoteModalOpened, createNoteModalHandle] = useDisclosure(false);

  const refetch = () => {};

  return (
    <NotePage
      pageTitle="Web Notes"
      pageSubtitle="Notes will be linked to your current accoun"
      createNote={createNote}
      createNoteModalHandle={createNoteModalHandle}
      createNoteModalOpened={createNoteModalOpened}
      isLoading={isLoading}
      notes={webNotes ? webNotes : []}
      refetch={refetch}
      searchValue={searchValue}
      setSearchValue={setSearchValue}
      searchValueDebounced={searchValue}
      updateNote={updateNote}
      userMenu={<UserMenu />}
      redirectAfterSubmit="/web-notes"
      noteMenuIcon={<IconCloud size={20} />}
    />
  )
}

export default WebNotes;