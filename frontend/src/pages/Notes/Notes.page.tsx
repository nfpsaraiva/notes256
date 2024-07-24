import { FC, useState } from 'react';
import { AppShell } from '@/components/Layout';
import { Box, Group, Stack } from '@mantine/core';
import NoteSearch from '@/features/Notes/NoteSearch/NoteSearch';
import { MainTitle } from '@/components/UI/MainTitle';
import { BlockchainLoader } from '@/components/Common';
import { IconRefresh } from '@tabler/icons-react';
import { useNotes } from '@/hooks';
import { useDebouncedValue } from '@mantine/hooks';
import CreateNoteButton from '@/features/Notes/CreateNote/CreateNoteButton';
import NotesList from '@/features/Notes/NotesList/NotesList';

const Notes: FC = () => {
  const [searchValue, setSearchValue] = useState('');
  const [searchValueDebounced] = useDebouncedValue(searchValue, 500);
  const { notes, isFetching, refetch } = useNotes(searchValueDebounced);

  return (
    <AppShell>
      <Stack gap={"xl"}>
        <Group justify="space-between" align="center" wrap="nowrap">
          <Box flex={1}>
            <MainTitle title='Notes' subtitle='Write statements and original ideas' />
          </Box>
          <CreateNoteButton />
        </Group>
        <NoteSearch
          searchValue={searchValue}
          setSearchValue={setSearchValue}
          submit={refetch}
          submitLabel="Refresh"
          submitIcon={<IconRefresh size={18} />}
        />
        {
          isFetching && <BlockchainLoader />
        }
        {
          notes && <NotesList notes={notes} />
        }
      </Stack>
    </AppShell>
  );
}

export default Notes;