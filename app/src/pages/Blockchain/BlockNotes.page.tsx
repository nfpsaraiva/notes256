import { FC, useState } from 'react';
import { AppShell } from '@/components/Layout';
import { Stack } from '@mantine/core';
import { MainTitle } from '@/components/UI/MainTitle';
import { Loader, WalletButton } from '@/components/Common';
import { IconRefresh } from '@tabler/icons-react';
import { useDebouncedValue, useDisclosure } from '@mantine/hooks';
import { CreateNoteButton, CreateNoteModal, NoteList, NoteSearch } from '@/components/Common/Notes';
import useBlockNotes from '@/hooks/useBlockNotes';
import { filterNotes } from '@/utils/NotesUtils';

const BlockNotes: FC = () => {
  const [searchValue, setSearchValue] = useState('');
  const [searchValueDebounced] = useDebouncedValue(searchValue, 500);
  const { blockNotes, createBlockNote, updateBlockNote, deleteBlockNote, isLoading, refetch } = useBlockNotes();
  const [createNoteModalOpened, createNoteModalHandle] = useDisclosure(false);

  return (
    <AppShell userMenu={<WalletButton />}>
      <Stack gap={"xl"}>
        <MainTitle title='Block Notes' subtitle='Notes will be secured by the blockchain' />
        <NoteSearch
          searchValue={searchValue}
          setSearchValue={setSearchValue}
          submit={refetch}
          submitLabel="Refresh"
          submitIcon={<IconRefresh size={18} />}
        />
        {
          isLoading && <Loader />
        }
        {
          blockNotes && <NoteList
            notes={filterNotes(blockNotes, searchValueDebounced)}
            updateNote={updateBlockNote}
            deleteNote={deleteBlockNote}
          />
        }
        <CreateNoteButton open={createNoteModalHandle.open} />
        <CreateNoteModal
          opened={createNoteModalOpened}
          close={createNoteModalHandle.close}
          createNote={createBlockNote}
          redirectAfterSubmit="/block-notes"
        />
      </Stack>
    </AppShell>
  );
}

export default BlockNotes;