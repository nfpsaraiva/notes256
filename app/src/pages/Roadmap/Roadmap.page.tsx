import { FC } from "react";
import roadmap from "./roadmap.md";
import Markdown from "react-markdown";
import { PageShell } from "@/components/UI";

const Roadmap: FC = () => {
  return (
    <PageShell title="Roadmap">
      <Markdown children={roadmap} />
    </PageShell>
  )
}

export default Roadmap;