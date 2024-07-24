import { AppShell } from "@/components/Layout";
import { MainTitle } from "@/components/UI/MainTitle";
import { NoteSearch } from "@/features/Notes/components";
import { Stack } from "@mantine/core";
import { FC, useState } from "react";

const Archive: FC = () => {
  const [searchValue, setSearchValue] = useState('');

  return (
    <AppShell>
      <Stack gap={"xl"}>
        <MainTitle title="Archive" subtitle="Archived notes" />
        <NoteSearch
          searchValue={searchValue}
          setSearchValue={setSearchValue}
        />
      </Stack>
    </AppShell>
  )
}

export default Archive;