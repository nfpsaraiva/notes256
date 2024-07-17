import { FC } from "react";
import Markdown from "react-markdown";
import about from "./about.md";

const About: FC = () => {
  return (
    <Markdown children={about} />
  )
}

export default About;