import { ProofCard } from "@/components/Common";
import { AppShell } from "@/components/Layout";
import ProofSearch from "@/features/Proofs/ProofSearch/ProofSearch";
import { useProof } from "@/hooks";
import useStore from "@/stores/store";
import { Center, Group, Loader, Stack, Text, Title } from "@mantine/core";
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

  const { proof, isLoading, isError } = useProof(proofId);
  return (
    <AppShell>
      <Stack gap={"xl"}>
        <Group justify="space-between" align="center">
          <Stack gap={2}>
            <Title>Search</Title>
            <Text c={"dimmed"}>Create original ideas</Text>
          </Stack>
        </Group>
        <ProofSearch searchValue={proofId} setSearchValue={setProofId} />
        {
          isLoading &&
          <Center>
            <Loader />
          </Center>
        }

        {
          (isError || !proof) && <></>
        }

        {
          proof &&
          <Center>
            <ProofCard proof={proof} />
          </Center>
        }
      </Stack>    </AppShell>
  )
}

export default Search;