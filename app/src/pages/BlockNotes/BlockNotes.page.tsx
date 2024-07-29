import { FC, useState } from 'react';
import { useDebouncedValue, useDisclosure } from '@mantine/hooks';
import { NotePage } from '@/components/Common/Notes';
import useBlockNotes from '@/hooks/useBlockNotes';
import { NoteMenu, UserMenu } from '@/components/BlockNotes';

const BlockNotes: FC = () => {
  const [searchValue, setSearchValue] = useState('');
  const [searchValueDebounced] = useDebouncedValue(searchValue, 500);
  const [createNoteModalOpened, createNoteModalHandle] = useDisclosure(false);
  
  const {
    blockNotes,
    createNote,
    updateNote,
    deleteNote,
    isLoading,
    refetch,
    transferNote
  } = useBlockNotes();

  return (
    <NotePage
      pageTitle="Block Notes"
      pageSubtitle="Notes will be secured by the blockchain"
      createNote={createNote}
      createNoteModalHandle={createNoteModalHandle}
      createNoteModalOpened={createNoteModalOpened}
      deleteNote={deleteNote}
      isLoading={isLoading}
      notes={blockNotes ? blockNotes : []}
      refetch={refetch}
      searchValue={searchValue}
      setSearchValue={setSearchValue}
      searchValueDebounced={searchValueDebounced}
      updateNote={updateNote}
      userMenu={<UserMenu />}
      redirectAfterSubmit="/block-notes"
      noteMenu={<NoteMenu />}
    />
  )
}

export default BlockNotes;