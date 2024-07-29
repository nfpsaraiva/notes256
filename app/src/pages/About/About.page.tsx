import { FC } from "react";
import Markdown from "react-markdown";
import about from "./about.md";
import { PageShell } from "@/components/UI";

const About: FC = () => {
  return (
    <PageShell title="About">
      <Markdown children={about} />
    </PageShell>
  )
}

export default About;