import { DraftList } from "@/components/Draft";
import { AppShell } from "@/components/Layout";
import { MainTitle } from "@/components/UI/MainTitle";
import CreateNoteButton from "@/features/Notes/CreateNote/CreateNoteButton";
import NoteSearch from "@/features/Notes/NoteSearch/NoteSearch";
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

  drafts.sort((a: Draft, b: Draft) => {
    if (a.id > b.id) return -1;
    if (a.id < b.id) return 1;
    return 0;
  });

  const draftsFiltered = drafts.filter(draft => {
    if (searchValue === "") return true;
    if (draft.name.toLowerCase().includes(searchValue)) return true;
    if (draft.description.toLowerCase().includes(searchValue)) return true;

    return false;
  })

  return (
    <AppShell>
      <Stack gap={"xl"}>
        <Group justify="space-between" align="center" wrap="nowrap">
          <Box flex={1}>
            <MainTitle title="Drafts" subtitle="Drafts will only be saved on your device" />
          </Box>
          <CreateNoteButton />
        </Group>
        <NoteSearch
          searchValue={searchValue}
          setSearchValue={setSearchValue}
        />
        {
          drafts && <DraftList drafts={draftsFiltered} />
        }
      </Stack>
    </AppShell>
  )
}

export default Drafts;