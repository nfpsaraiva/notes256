import { ProofCard } from "@/components/Common";
import { AppShell } from "@/components/Layout";
import { MainTitle } from "@/components/UI/MainTitle";
import ProofSearch from "@/features/Proofs/ProofSearch/ProofSearch";
import { useProof } from "@/hooks";
import useStore from "@/stores/store";
import { Center, Loader, Stack, Text } from "@mantine/core";
import { IconCheck } from "@tabler/icons-react";
import { FC } from "react";
import { useShallow } from "zustand/react/shallow";

const Search: FC = () => {
  const [
    proofId,
    setProofId,
  ] = useStore(useShallow(state => [
    state.proofId,
    state.setProofId
  ]));

  const { proof, isLoading, isError, refetch } = useProof(proofId);

  return (
    <AppShell>
      <Stack gap={"xl"}>
        <MainTitle title="Verify Proof" subtitle="Validate if a proof exists" />
        <ProofSearch
          searchValue={proofId}
          setSearchValue={setProofId}
          placeholder="Type a proof ID"
          submit={refetch}
          submitLabel="Verify"
          submitIcon={<IconCheck size={18} />}
        />
        {
          isLoading &&
          <Center>
            <Loader />
          </Center>
        }

        {
          (isError || !proof) &&
          <Center>
            <Text>No proofs found</Text>
          </Center>
        }

        {
          proof &&
          <Center>
            <ProofCard proof={proof} />
          </Center>
        }
      </Stack>
    </AppShell>
  )
}

export default Search;