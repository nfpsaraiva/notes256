import { Draft } from "@/types";
import { Button, Group } from "@mantine/core";
import { FC } from "react";

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
      <Group justify="space-between">
        <Button variant="subtle" radius={"lg"}>Save Draft</Button>
        <Button variant="filled" radius={"lg"}>Publish</Button>
      </Group>
    )
  }

  return (
    <Group justify="space-between">
    </Group>
  )
}

export default DraftCardControls;