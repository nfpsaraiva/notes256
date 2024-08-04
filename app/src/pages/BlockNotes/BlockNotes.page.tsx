import { FC, useState } from 'react';
import { useDebouncedValue, useDisclosure } from '@mantine/hooks';
import { NotePage } from '@/components/Common/Notes';
import useBlockNotes from '@/hooks/useBlockNotes';
import { UserMenu } from '@/components/BlockNotes';
import { IconCube } from '@tabler/icons-react';

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
    transferNote
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
    />
  )
}

export default BlockNotes;