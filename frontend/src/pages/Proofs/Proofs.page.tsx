import { FC, useState } from 'react';
import { AppShell } from '@/components/Layout';
import { Box, Center, Group, Loader, Stack, Text, Title } from '@mantine/core';
import CreateProofButton from '@/features/Proofs/CreateProof/CreateProofButton';
import ProofSearch from '@/features/Proofs/ProofSearch/ProofSearch';
import ProofsList from '@/features/Proofs/ProofsList/ProofList';
import { useWeb3ModalAccount } from '@web3modal/ethers/react';
import { Proof } from '@/types';
import { MainTitle } from '@/components/UI/MainTitle';
import useProofs from '@/hooks/useProofs';

const Proofs: FC = () => {
  const { address } = useWeb3ModalAccount();
  const { proofs, isLoading } = useProofs(address);
  const [searchValue, setSearchValue] = useState('');

  let filteredProofs: Proof[] = [];

  if (proofs) {
    filteredProofs = proofs.filter(proof => {
      return proof.name.toLowerCase().includes(searchValue.toLocaleLowerCase())
        || proof.description.toLowerCase().includes(searchValue.toLowerCase());
    });
  }

  return (
    <AppShell>
      <Stack gap={"xl"}>
        <Group justify="space-between" align="center" wrap="nowrap">
          <Box flex={1}>
            <MainTitle title='My Proofs' subtitle='Write statements and original ideas' />
          </Box>
          <CreateProofButton />
        </Group>
        <ProofSearch
          searchValue={searchValue}
          setSearchValue={setSearchValue}
          
        />


        {
          isLoading
            ? <Center><Loader /></Center>
            : <ProofsList proofs={filteredProofs} />
        }

      </Stack>
    </AppShell>
  );
}

export default Proofs;