import { Draft } from "@/types";
import { Button, Group } from "@mantine/core";
import { FC } from "react";
import DeleteButton from "./DeleteButton/DeleteButton";
import PublishButton from "./PublishButton/PublishButton";
import SaveButton from "./PublishButton/SaveButton";

interface DraftCardControlsProps {
  draft: Draft,
  expanded: boolean
}

const DraftCardControls: FC<DraftCardControlsProps> = ({
  draft,
  expanded
}: DraftCardControlsProps) => {

  if (expanded) {
    return (
      <Group>
        <SaveButton />
        <PublishButton />
        <DeleteButton draft={draft} />
      </Group>
    )
  }

  return (
    <Group>
      <PublishButton />
      <DeleteButton draft={draft} />
    </Group>
  )
}

export default DraftCardControls;