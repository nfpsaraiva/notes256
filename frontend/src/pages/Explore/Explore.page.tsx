import { BlockchainLoader } from "@/components/Common";
import { AppShell } from "@/components/Layout";
import { MainTitle } from "@/components/UI/MainTitle";
import CreateProofButton from "@/features/Proofs/CreateProof/CreateProofButton";
import ProofSearch from "@/features/Proofs/ProofSearch/ProofSearch";
import ProofsList from "@/features/Proofs/ProofsList/ProofList";
import useProofs from "@/hooks/useProofs";
import { Proof } from "@/types";
import { Box, Center, Group, Loader, Stack } from "@mantine/core";
import { FC, useState } from "react";

const Explore: FC = () => {
  const [searchValue, setSearchValue] = useState<string>('');
  const { proofs, isFetching } = useProofs();

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
            <MainTitle title="Explore" subtitle="Explore ideas created by the communitiy" />
          </Box>
          <CreateProofButton />
        </Group>
        <ProofSearch
          searchValue={searchValue}
          setSearchValue={setSearchValue}
          placeholder="Search by keyword, ID or owner"
        />
        {
          isFetching && <BlockchainLoader />
        }
        <ProofsList proofs={filteredProofs} />
      </Stack>
    </AppShell>
  )
}

export default Explore;
