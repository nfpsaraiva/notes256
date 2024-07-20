import { Center, Stack, Text, Timeline } from "@mantine/core";
import { FC } from "react";
import classes from "./Roadmap.module.css"
import { AppShell } from "@/components/Layout";
import { MainTitle } from "@/components/UI/MainTitle";

const Roadmap: FC = () => {
  return (
    <AppShell>
      <Stack>
        <MainTitle title="Roadmap" />
        <Center>
          <Timeline active={1} bulletSize={34} lineWidth={4} className={classes.roadmap} classNames={{ itemBullet: classes.bullet }}>
            <Timeline.Item className={classes.item} title="Local Development">
              <Text c="dimmed" size="sm">Project scaffolded</Text>
            </Timeline.Item>

            <Timeline.Item className={classes.item} title="Deploy prototype to testnet">
              <Text c="dimmed" size="sm">Integration with an ethereum node server</Text>
            </Timeline.Item>

            <Timeline.Item className={classes.item} title="Testing" lineVariant="dashed">
              <Text c="dimmed" size="sm">You&apos;ve submitted a pull request<Text variant="link" component="span" inherit>Fix incorrect notification message (#187)</Text></Text>
            </Timeline.Item>

            <Timeline.Item className={classes.item} title="Public Deploy">
              <Text c="dimmed" size="sm"><Text variant="link" component="span" inherit>Robert Gluesticker</Text> left a code review on your pull request</Text>
            </Timeline.Item>
          </Timeline>
        </Center>
      </Stack>
    </AppShell>
  )
}

export default Roadmap;