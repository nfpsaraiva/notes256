import { FC, useState } from 'react';
import { AppShell } from '@/components/Layout';
import { Stack } from '@mantine/core';
import { MainTitle } from '@/components/UI/MainTitle';
import { BlockchainLoader } from '@/components/Common';
import { IconRefresh } from '@tabler/icons-react';
import { useDebouncedValue } from '@mantine/hooks';
import { NftSearch, NftsList } from '@/features/Nfts/components';
import { useNfts } from '@/features/Nfts/hooks';

const Blockchain: FC = () => {
  const [searchValue, setSearchValue] = useState('');
  const [searchValueDebounced] = useDebouncedValue(searchValue, 500);
  const { nfts, isFetching, refetch } = useNfts(searchValueDebounced);

  return (
    <AppShell>
      <Stack gap={"xl"}>
        <MainTitle title='NFTs' subtitle='Write statements and original ideas' />
        <NftSearch
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
          nfts && <NftsList nfts={nfts} />
        }
      </Stack>
    </AppShell>
  );
}

export default Blockchain;