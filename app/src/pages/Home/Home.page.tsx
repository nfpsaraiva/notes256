import { PageShell } from "@/components/UI";
import { FC } from "react";
import { Grid } from "@mantine/core";
import { WidgetAppIntro } from "@/components/Widgets";

const Home: FC = () => {

  return (
    <PageShell title="Welcome to Notes256" subtitle="Your Notes, Your Way" userMenu={<></>}>
      <Grid gutter={"lg"}>
        <Grid.Col span={12}>
          <WidgetAppIntro />
        </Grid.Col>
      </Grid>
    </PageShell>
  )
}

export default Home;