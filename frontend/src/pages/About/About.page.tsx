import { AppShell } from "@/components/Layout";
import { FC } from "react";
import Markdown from "react-markdown";
import about from "./about.md"
import { Stack } from "@mantine/core";
import { MainTitle } from "@/components/UI/MainTitle";

const About: FC = () => {
  return (
    <AppShell>
      <Stack>
        <MainTitle title="Welcome to Provify" />
        <Markdown children={about} />
      </Stack>
    </AppShell>
  )
}

export default About;