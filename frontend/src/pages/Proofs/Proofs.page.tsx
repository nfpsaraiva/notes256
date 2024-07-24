import { FC, useState } from 'react';
import { AppShell } from '@/components/Layout';
import { Box, Group, Stack } from '@mantine/core';
import CreateProofButton from '@/features/Proofs/CreateProof/CreateProofButton';
import ProofSearch from '@/features/Proofs/ProofSearch/ProofSearch';
import ProofsList from '@/features/Proofs/ProofsList/ProofList';
import { MainTitle } from '@/components/UI/MainTitle';
import { BlockchainLoader } from '@/components/Common';
import { IconRefresh } from '@tabler/icons-react';
import { useProofsByOwner } from '@/hooks';
import { useDebouncedValue } from '@mantine/hooks';

const Proofs: FC = () => {
  const [searchValue, setSearchValue] = useState('');
  const [searchValueDebounced] = useDebouncedValue(searchValue, 500);
  const { proofs, isFetching, refetch } = useProofsByOwner(searchValueDebounced);

  return (
    <AppShell>
      <Stack gap={"xl"}>
        <Group justify="space-between" align="center" wrap="nowrap">
          <Box flex={1}>
            <MainTitle title='Proofs' subtitle='Write statements and original ideas' />
          </Box>
          <CreateProofButton />
        </Group>
        <ProofSearch
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
          proofs && <ProofsList proofs={proofs} />
        }
      </Stack>
    </AppShell>
  );
}

export default Proofs;