import { FC, useState } from 'react';
import { useDebouncedValue } from '@mantine/hooks';
import { NotePage } from '@/components/Common/Notes';
import { UserMenu } from '@/components/BlockNotes';
import { IconCube } from '@tabler/icons-react';
import { useBlockNotes } from '@/hooks';

const BlockNotes: FC = () => {
  const [searchValue, setSearchValue] = useState('');
  const [searchValueDebounced] = useDebouncedValue(searchValue, 500);
  
  const {
    blockNotes,
    createNote,
    creatingNote,
    updateNote,
    isLoading,
    refetch,
    transferNote,
    isConnected
  } = useBlockNotes();

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
      noteMenuIcon={<IconCube size={20} />}
      isConnected={isConnected}
    />
  )
}

export default BlockNotes;