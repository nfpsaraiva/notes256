import { AppShell } from "@/components/Layout";
import { MainTitle } from "@/components/UI/MainTitle";
import { NoteList, NoteSearch } from "@/features/Notes/components";
import { useNotes } from "@/features/Notes/hooks";
import { getNotesFiltered } from "@/features/Notes/utils/noteUtils";
import { Box, Button, Group, Stack } from "@mantine/core";
import { useOs } from "@mantine/hooks";
import { IconDeviceMobile } from "@tabler/icons-react";
import { FC, useState } from "react";

const Local: FC = () => {
  const [searchValue, setSearchValue] = useState('');
  const { notes } = useNotes();
  const os = useOs();

  const userMenu = (
    <Button
      size="md"
      fw={700} variant="transparent"
      leftSection={
        <IconDeviceMobile size={16} stroke={3} />
      }
    >
      {os === "undetermined" ? "Local device" : os}
    </Button>
  )

  return (
    <AppShell userMenu={userMenu}>
      <Stack gap={"xl"}>
        <Group justify="space-between" align="center" wrap="nowrap">
          <Box flex={1}>
            <MainTitle title="Local Notes" subtitle="Notes will only be saved on your device" />
          </Box>
        </Group>
        <NoteSearch
          searchValue={searchValue}
          setSearchValue={setSearchValue}
        />
        {
          notes && <NoteList notes={getNotesFiltered(notes, searchValue)} />
        }
      </Stack>
    </AppShell>
  )
}

export default Local;