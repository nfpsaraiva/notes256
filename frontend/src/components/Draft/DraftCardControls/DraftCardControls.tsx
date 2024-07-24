import { Draft } from "@/types";
import { Group, Text } from "@mantine/core";
import { FC } from "react";
import DeleteButton from "./DeleteButton/DeleteButton";
import PublishButton from "./PublishButton/PublishButton";

interface DraftCardControlsProps {
  draft: Draft,
  expanded: boolean,
  newTitle: string,
  newDescription: string,
}

const DraftCardControls: FC<DraftCardControlsProps> = ({
  draft,
  expanded,
  newTitle,
  newDescription
}: DraftCardControlsProps) => {
  return (
    <Group justify="space-between">
      <Group>
        <PublishButton />
        <DeleteButton draft={draft} />
      </Group>
    </Group>
  )
}

export default DraftCardControls;