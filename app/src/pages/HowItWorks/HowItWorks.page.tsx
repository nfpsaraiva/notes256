import { FC } from "react";
import Markdown from "react-markdown";
import howItWorks from "./how-it-works.md";
import { PageShell } from "@/components/UI";
import { Box } from "@mantine/core";

const HowItWorks: FC = () => {
  return (
    <PageShell title="How it works">
      <Box>
        <Markdown children={howItWorks} />
      </Box>
    </PageShell>
  )
}

export default HowItWorks;