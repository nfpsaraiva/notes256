import { PageShell } from "@/components/UI";
import { FC } from "react";
import Markdown from "react-markdown";
import home from "./home.md"
import { Box } from "@mantine/core";

const Home: FC = () => {
  return (
    <PageShell title="Welcome to Notes256" userMenu={<></>}>
      <Box>
        <Markdown children={home} />
      </Box>
    </PageShell>
  )
}

export default Home;