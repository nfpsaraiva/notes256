import { PageShell } from "@/components/UI";
import { FC } from "react";
import { Grid } from "@mantine/core";
import { WidgetAnnouncements, WidgetAppIntro, WidgetRecentNotes } from "@/components/Widgets";

const Home: FC = () => {

  return (
    <PageShell title="Welcome to Notes256" subtitle="Your Notes, Your Way" userMenu={<></>}>
      <Grid gutter={"lg"}>
        {/* <Grid.Col span={12}>
          <WidgetAppIntro />
        </Grid.Col>
        <Grid.Col span={{base: 12, lg: 4}}>
          <WidgetRecentNotes />
        </Grid.Col>
        <Grid.Col span={{base: 12, lg: 8}}>
          <WidgetAnnouncements />
        </Grid.Col> */}
      </Grid>
    </PageShell>
  )
}

export default Home;