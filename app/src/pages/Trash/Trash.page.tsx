import { AppShell } from "@/components/Layout";
import { MainTitle } from "@/components/UI/MainTitle";
import { NoteList, NoteSearch } from "@/features/Notes/components";
import { Status } from "@/features/Notes/enums";
import { useNotes } from "@/features/Notes/hooks";
import { Box, Group, Stack } from "@mantine/core";
import { FC, useState } from "react";

const Trash: FC = () => {
  const [searchValue, setSearchValue] = useState('');
  const { notes } = useNotes(Status.TRASHED, searchValue);

  return (
    <AppShell>
      <Stack gap={"xl"}>
        <Group justify="space-between" align="center" wrap="nowrap">
          <Box flex={1}>
            <MainTitle title="Trash" subtitle="Trashed notes" />
          </Box>
        </Group>
        <NoteSearch
          searchValue={searchValue}
          setSearchValue={setSearchValue}
        />
        {
          notes && <NoteList notes={notes} />
        }
      </Stack>
    </AppShell>
  )
}

export default Trash;