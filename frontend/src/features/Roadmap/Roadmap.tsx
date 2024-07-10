import { Center, Text, Timeline } from "@mantine/core";
import { IconGitBranch, IconGitCommit, IconGitPullRequest, IconMessageDots } from "@tabler/icons-react";
import { FC } from "react";

const Roadmap: FC = () => {
  return (
    <Center>
      <Timeline active={1} bulletSize={34} lineWidth={5}>
        <Timeline.Item title="Local Development">
          <Text c="dimmed" size="sm">Project scaffolded</Text>
        </Timeline.Item>

        <Timeline.Item title="Deploy prototype to testnet">
          <Text c="dimmed" size="sm">Integration with an ethereum node server</Text>
        </Timeline.Item>

        <Timeline.Item title="Testing" lineVariant="dashed">
          <Text c="dimmed" size="sm">You&apos;ve submitted a pull request<Text variant="link" component="span" inherit>Fix incorrect notification message (#187)</Text></Text>
        </Timeline.Item>

        <Timeline.Item title="Public Deploy">
          <Text c="dimmed" size="sm"><Text variant="link" component="span" inherit>Robert Gluesticker</Text> left a code review on your pull request</Text>
        </Timeline.Item>
      </Timeline>
    </Center>
  )
}

export default Roadmap;