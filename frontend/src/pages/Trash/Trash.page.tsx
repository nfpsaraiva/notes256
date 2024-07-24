import { AppShell } from "@/components/Layout";
import { MainTitle } from "@/components/UI/MainTitle";
import { NoteSearch } from "@/features/Notes/components";
import { Stack } from "@mantine/core";
import { FC, useState } from "react";

const Trash: FC = () => {
  const [searchValue, setSearchValue] = useState('');

  return (
    <AppShell>
      <Stack gap={"xl"}>
        <MainTitle title="Trash" subtitle="Deleted notes" />
        <NoteSearch
          searchValue={searchValue}
          setSearchValue={setSearchValue}
        />
      </Stack>
    </AppShell>
  )
}

export default Trash;