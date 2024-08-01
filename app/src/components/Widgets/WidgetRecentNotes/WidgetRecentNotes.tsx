import useNotes from "@/hooks/useNotes";
import { FC } from "react";
import Widget from "../Widget/Widget";
import { NoteList } from "@/components/Common/Notes";
import { Stack, Title } from "@mantine/core";

const WidgetRecentNotes: FC = () => {
  const { notes } = useNotes();

  return (
    <Widget>
      <Stack>
        <Title order={4}>Recent Notes</Title>
        <NoteList notes={notes} />
      </Stack>
    </Widget>
  )
}

export default WidgetRecentNotes;