import { BlockchainLoader } from "@/components/Common";
import UserMenu from "@/components/Common/UserMenu/UserMenu";
import { AppShell } from "@/components/Layout";
import { MainTitle } from "@/components/UI/MainTitle";
import { useUserbase } from "@/contexts";
import { NoteList, NoteSearch } from "@/features/Notes/components";
import { getNotesFiltered } from "@/features/Notes/utils/noteUtils";
import { Box, Group, Stack } from "@mantine/core";
import { FC, useState } from "react";

const Notes: FC = () => {
  const [searchValue, setSearchValue] = useState('');
  const { notes, isLoadingActiveNotes } = useUserbase();

  return (
    <AppShell userMenu={<UserMenu />}>
      <Stack gap={"xl"}>
        <MainTitle title="Web Notes" subtitle="Notes will be linked to your current account" />
        <NoteSearch
          searchValue={searchValue}
          setSearchValue={setSearchValue}
        />
        {
          isLoadingActiveNotes && <BlockchainLoader />
        }
        {
          notes && <NoteList notes={getNotesFiltered(notes, searchValue)} />
        }
      </Stack>
    </AppShell>
  )
}

export default Notes;