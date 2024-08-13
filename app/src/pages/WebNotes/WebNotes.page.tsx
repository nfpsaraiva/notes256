import { NotePage } from "@/components/Common/Notes";
import { UserMenu } from "@/components/WebNotes";
import { useWebNotes, useWebUser } from "@/hooks";
import { useDebouncedValue } from "@mantine/hooks";
import { FC, useState } from "react";

const WebNotes: FC = () => {
  const [searchValue, setSearchValue] = useState('');
  const [searchValueDebounced] = useDebouncedValue(searchValue, 500);

  const {
    notes,
    isLoading,
    createNote,
    creatingNote,
    updateNote,
    transferNote,
    transferingNote,
    refetch,
  } = useWebNotes();

  const { isConnected } = useWebUser();

  return (
    <NotePage
      pageTitle="Web Notes"
      pageSubtitle="Notes will be linked to your account"
      createNote={createNote}
      creatingNote={creatingNote}
      isLoading={isLoading}
      notes={notes ? notes : []}
      refetch={refetch}
      searchValue={searchValue}
      setSearchValue={setSearchValue}
      searchValueDebounced={searchValueDebounced}
      updateNote={updateNote}
      userMenu={<UserMenu />}
      isConnected={isConnected}
      transfer={transferNote}
      transfering={transferingNote}
    />
  )
}

export default WebNotes;