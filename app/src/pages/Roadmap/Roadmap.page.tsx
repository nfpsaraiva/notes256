import { FC } from "react";
import roadmap from "./roadmap.md";
import Markdown from "react-markdown";
import { PageShell } from "@/components/UI";
import { Box } from "@mantine/core";

const Roadmap: FC = () => {
  return (
    <PageShell title="Roadmap">
      <Box>
        <Markdown children={roadmap} />
      </Box>
    </PageShell>
  )
}

export default Roadmap;