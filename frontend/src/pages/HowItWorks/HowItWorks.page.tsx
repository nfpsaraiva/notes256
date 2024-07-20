import { AppShell } from "@/components/Layout";
import { FC } from "react";
import Markdown from "react-markdown";
import howItWorks from "./how-it-works.md";
import { Stack } from "@mantine/core";
import { MainTitle } from "@/components/UI/MainTitle";


const HowItWorks: FC = () => {
  return (
    <AppShell>
      <Stack>
        <MainTitle title="How it works" />
        <Markdown children={howItWorks} />
      </Stack>
    </AppShell>
  )
}

export default HowItWorks;