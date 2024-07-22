import { AppShell } from "@/components/Layout";
import { MainTitle } from "@/components/UI/MainTitle";
import CreateProofButton from "@/features/Proofs/CreateProof/CreateProofButton";
import ProofSearch from "@/features/Proofs/ProofSearch/ProofSearch";
import { Box, Group, Stack } from "@mantine/core";
import { FC, useState } from "react";

const Drafts: FC = () => {
  const [searchValue, setSearchValue] = useState('');

  return (
    <AppShell>
      <Stack>
        <Group justify="space-between" align="center" wrap="nowrap">
          <Box flex={1}>
            <MainTitle title="Drafts" subtitle="Create drafts first" />
          </Box>
          <CreateProofButton />
        </Group>
        <ProofSearch
          searchValue={searchValue}
          setSearchValue={setSearchValue}

        />
      </Stack>
    </AppShell>
  )
}

export default Drafts;