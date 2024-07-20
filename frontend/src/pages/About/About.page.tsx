import { AppShell } from "@/components/Layout";
import { FC } from "react";
import Markdown from "react-markdown";
import about from "./about.md"
import { Box, Stack } from "@mantine/core";
import { MainTitle } from "@/components/UI/MainTitle";

const About: FC = () => {
  return (
    <AppShell>
      <Stack>
        <MainTitle title="Welcome to Provify" />
        <Box>
          <Markdown children={about} />
        </Box>
      </Stack>
    </AppShell>
  )
}

export default About;