import { FC } from "react";
import Markdown from "react-markdown";
import howItWorks from "./how-it-works.md";

const HowItWorks: FC = () => {
  return (
    <Markdown children={howItWorks} />
  )
}

export default HowItWorks;