import { NotePage } from "@/components/Common/Notes";
import { UserMenu } from "@/components/WebNotes";
import { useWebNotes } from "@/hooks";
import { IconCloud } from "@tabler/icons-react";
import { FC, useState } from "react";

const WebNotes: FC = () => {
  const [searchValue, setSearchValue] = useState('');
  const { webNotes, isLoading, createNote, updateNote, refetch } = useWebNotes();

  return (
    <NotePage
      pageTitle="Web Notes"
      pageSubtitle="Notes will be linked to your current account"
      createNote={createNote}
      isLoading={isLoading}
      notes={webNotes ? webNotes : []}
      refetch={refetch}
      searchValue={searchValue}
      setSearchValue={setSearchValue}
      searchValueDebounced={searchValue}
      updateNote={updateNote}
      userMenu={<UserMenu />}
      noteMenuIcon={<IconCloud size={20} />}
    />
  )
}

export default WebNotes;