import { FC } from "react";
import introMd from "./intro.md";
import { Box } from "@mantine/core";
import Markdown from "react-markdown";
import Widget from "../Widget/Widget";

const WidgetAppIntro: FC = () => {
  return (
    <Widget>
      <Box>
        <Markdown children={introMd} />
      </Box>
    </Widget>
  )
}

export default WidgetAppIntro;