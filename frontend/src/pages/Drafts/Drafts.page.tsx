import { AppShell } from "@/components/Layout";
import { MainTitle } from "@/components/UI/MainTitle";
import { Stack } from "@mantine/core";
import { FC } from "react";

const Drafts: FC = () => {
  return (
    <AppShell>
      <Stack>
        <MainTitle title="Drafts" subtitle="Create drafts first" />
      </Stack>
    </AppShell>
  )
}

export default Drafts;