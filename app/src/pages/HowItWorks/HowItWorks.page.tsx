import { FC } from "react";
import Markdown from "react-markdown";
import howItWorks from "./how-it-works.md";
import { PageShell } from "@/components/UI";

const HowItWorks: FC = () => {
  return (
    <PageShell title="How it worksl">
      <Markdown children={howItWorks} />
    </PageShell>
  )
}

export default HowItWorks;