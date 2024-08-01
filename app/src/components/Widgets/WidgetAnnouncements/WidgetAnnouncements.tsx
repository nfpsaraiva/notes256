import { List, Stack, Title } from "@mantine/core";
import { FC } from "react";
import Widget from "../Widget/Widget";

const WidgetAnnouncements: FC = () => {
  return (
    <Widget>
      <Stack>
        <Title order={4}>Latest Annoucements</Title>
        <List>
          <List.Item>Update 1</List.Item>
        </List>
      </Stack>
    </Widget>
  )
}

export default WidgetAnnouncements;