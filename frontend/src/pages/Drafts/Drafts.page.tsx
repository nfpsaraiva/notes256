import { DraftList } from "@/components/Draft";
import { AppShell } from "@/components/Layout";
import { MainTitle } from "@/components/UI/MainTitle";
import CreateProofButton from "@/features/Proofs/CreateProof/CreateProofButton";
import ProofSearch from "@/features/Proofs/ProofSearch/ProofSearch";
import { Draft } from "@/types";
import { Box, Group, Stack } from "@mantine/core";
import { useLocalStorage } from "@mantine/hooks";
import { FC, useState } from "react";

const Drafts: FC = () => {
  const [searchValue, setSearchValue] = useState('');
  const [drafts] = useLocalStorage<Draft[]>({
    key: "provify-drafts",
    defaultValue: []
  });

  return (
    <AppShell>
      <Stack gap={"xl"}>
        <Group justify="space-between" align="center" wrap="nowrap">
          <Box flex={1}>
            <MainTitle title="Drafts" subtitle="Drafts will only be saved on your device" />
          </Box>
          <CreateProofButton />
        </Group>
        <ProofSearch
          searchValue={searchValue}
          setSearchValue={setSearchValue}
        />
        {
          drafts && <DraftList drafts={drafts} />
        }
      </Stack>
    </AppShell>
  )
}

export default Drafts;