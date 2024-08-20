import { Anchor, Group, Stack, Text } from "@mantine/core";
import { FC } from "react";

const BottomMenu: FC = () => {
  return (
    <Stack gap={4}>
      <Group justify="center">
        <Anchor c={"var(--mantine-color-text)"} fw={600} underline="never" target="_blank" href="https://github.com/nfpsaraiva/notes256" size="xs">Beta v0.1.3</Anchor>
      </Group>
    </Stack>
  )
}

export default BottomMenu;