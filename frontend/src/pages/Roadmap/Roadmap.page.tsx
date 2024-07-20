import { Box, Stack } from "@mantine/core";
import { FC } from "react";
import { AppShell } from "@/components/Layout";
import { MainTitle } from "@/components/UI/MainTitle";
import roadmap from "./roadmap.md";
import Markdown from "react-markdown";

const Roadmap: FC = () => {
  return (
    <AppShell>
      <Stack>
        <MainTitle title="Roadmap" />
        <Box>
          <Markdown children={roadmap} />
        </Box>
      </Stack>
    </AppShell>
  )
}

export default Roadmap;