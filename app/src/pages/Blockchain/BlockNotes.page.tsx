import { FC, useState } from 'react';
import { useDebouncedValue, useDisclosure } from '@mantine/hooks';
import { NotePage } from '@/components/Common/Notes';
import useBlockNotes from '@/hooks/useBlockNotes';
import { UserMenu } from '@/components/BlockNotes';

const BlockNotes: FC = () => {
  const [searchValue, setSearchValue] = useState('');
  const [searchValueDebounced] = useDebouncedValue(searchValue, 500);
  const [createNoteModalOpened, createNoteModalHandle] = useDisclosure(false);
  
  const {
    blockNotes,
    createBlockNote,
    updateBlockNote,
    deleteBlockNote,
    isLoading,
    refetch
  } = useBlockNotes();

  return (
    <NotePage
      pageTitle="Block Notes"
      pageSubtitle="Notes will be secured by the blockchain"
      createNote={createBlockNote}
      createNoteModalHandle={createNoteModalHandle}
      createNoteModalOpened={createNoteModalOpened}
      deleteNote={deleteBlockNote}
      isLoading={isLoading}
      notes={blockNotes ? blockNotes : []}
      refetch={refetch}
      searchValue={searchValueDebounced}
      setSearchValue={setSearchValue}
      updateNote={updateBlockNote}
      userMenu={<UserMenu />}
      redirectAfterSubmit="/block-notes"
    />
  )
}

export default BlockNotes;