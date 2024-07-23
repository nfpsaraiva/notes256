import { Draft } from "@/types";
import { Group, Stack, Text, Title } from "@mantine/core";
import { FC } from "react";

interface DraftCardHeaderProps {
  Draft: Draft
}

const DraftCardHeader: FC<DraftCardHeaderProps> = ({ Draft }: DraftCardHeaderProps) => {
  return (
      <Stack gap={4}>
        <Title order={3} size={"h5"} lineClamp={1}>{Draft.name}</Title>
        <Text c={"dimmed"} size="xs" fw={500}>
          {Draft.date.toLocaleDateString()} {Draft.date.toLocaleTimeString()}
        </Text>
      </Stack>
  )
}

export default DraftCardHeader;