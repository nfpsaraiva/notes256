import { NotePage } from "@/components/Common/Notes";
import { UserMenu } from "@/components/WebNotes";
import { useWebNotes, useWebUser } from "@/hooks";
import { FC, useState } from "react";

const WebNotes: FC = () => {
  const [searchValue, setSearchValue] = useState('');
  const {
    notes,
    isLoading,
    createNote,
    creatingNote,
    updateNote,
    transferNote,
    refetch,
  } = useWebNotes();

  const { isConnected } = useWebUser();

  return (
    <NotePage
      pageTitle="Web Notes"
      pageSubtitle="Notes will be linked to your current account"
      createNote={createNote}
      creatingNote={creatingNote}
      isLoading={isLoading}
      notes={notes ? notes : []}
      refetch={refetch}
      searchValue={searchValue}
      setSearchValue={setSearchValue}
      searchValueDebounced={searchValue}
      updateNote={updateNote}
      userMenu={<UserMenu />}
      isConnected={isConnected}
      transfer={transferNote}
    />
  )
}

export default WebNotes;