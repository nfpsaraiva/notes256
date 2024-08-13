import { NotePage } from "@/components/Common/Notes";
import { UserMenu } from "@/components/LocalNotes";
import { useLocalNotes } from "@/hooks";
import { useDebouncedValue } from "@mantine/hooks";
import { FC, useState } from "react";

const LocalNotes: FC = () => {
  const [searchValue, setSearchValue] = useState('');
  const [searchValueDebounced] = useDebouncedValue(searchValue, 500);

  const {
    localNotes,
    refetch,
    createNote,
    creatingNote,
    updateNote,
    transferNote,
    transferingNote,
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
      searchValueDebounced={searchValueDebounced}
      updateNote={updateNote}
      userMenu={<UserMenu />}
      isConnected={isConnected}
      transfer={transferNote}
      transfering={transferingNote}
    />
  )
}

export default LocalNotes;