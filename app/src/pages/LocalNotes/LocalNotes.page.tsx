import { NotePage } from "@/components/Common/Notes";
import { UserMenu } from "@/components/LocalNotes";
import { useLocalNotes } from "@/hooks";
import { FC, useState } from "react";

const LocalNotes: FC = () => {
  const [searchValue, setSearchValue] = useState('');
  const {
    localNotes,
    refetch,
    createNote,
    creatingNote,
    updateNote,
    transferNote,
    isConnected
  } = useLocalNotes();


  return (
    <NotePage
      pageTitle="Local Notes"
      pageSubtitle="Notes will only be saved on your device"
      createNote={createNote}
      creatingNote={creatingNote}
      isLoading={false}
      notes={localNotes}
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

export default LocalNotes;