import { BlockchainLoader } from "@/components/Common";
import { AppShell } from "@/components/Layout";
import { MainTitle } from "@/components/UI/MainTitle";
import CreateProofButton from "@/features/Proofs/CreateProof/CreateProofButton";
import ProofSearch from "@/features/Proofs/ProofSearch/ProofSearch";
import ProofsList from "@/features/Proofs/ProofsList/ProofList";
import useProofs from "@/hooks/useProofs";
import { Box, Group, Stack } from "@mantine/core";
import { useDebouncedValue } from "@mantine/hooks";
import { IconRefresh } from "@tabler/icons-react";
import { FC, useState } from "react";

const Explore: FC = () => {
  const [searchValue, setSearchValue] = useState<string>('');
  const [searchValueDebounced] = useDebouncedValue(searchValue, 500);
  const { proofs, isFetching, refetch } = useProofs(searchValueDebounced);

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
  )
}

export default Explore;
