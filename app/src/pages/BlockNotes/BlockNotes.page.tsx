import { FC, useState } from 'react';
import { useDebouncedValue } from '@mantine/hooks';
import { NotePage } from '@/components/Common/Notes';
import { UserMenu } from '@/components/BlockNotes';
import { useBlockNotes } from '@/hooks';
import { useParams } from 'react-router-dom';

const BlockNotes: FC = () => {
  const [searchValue, setSearchValue] = useState('');
  const [searchValueDebounced] = useDebouncedValue(searchValue, 500);
  const { noteId } = useParams();

  const {
    blockNotes,
    createNote,
    creatingNote,
    updateNote,
    isLoading,
    refetch,
    transferNote,
    isConnected
  } = useBlockNotes(noteId);

  return (
    <NotePage
      pageTitle="Block Notes"
      pageSubtitle="Notes will be secured by the blockchain"
      createNote={createNote}
      creatingNote={creatingNote}
      isLoading={isLoading}
      notes={blockNotes ? blockNotes : []}
      refetch={refetch}
      searchValue={searchValue}
      setSearchValue={setSearchValue}
      searchValueDebounced={searchValueDebounced}
      updateNote={updateNote}
      userMenu={<UserMenu />}
      isConnected={isConnected}
      transfer={transferNote}
    />
  )
}

export default BlockNotes;