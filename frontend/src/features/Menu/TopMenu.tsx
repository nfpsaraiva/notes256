import { Group, Stack, Text, UnstyledButton } from "@mantine/core";
import { IconCheck, IconList, IconTrash } from "@tabler/icons-react";
import { FC } from "react";
import classes from "./TopMenu.module.css";
import { useShallow } from "zustand/react/shallow";
import useStore from "@/stores/provifyStore";

const TopMenu: FC = () => {
  const [
    setPanel
  ] = useStore(useShallow(state => [
    state.setPanel,
  ]));

  return (
    <Stack gap="xs" className={classes.menu}>
      <UnstyledButton className={classes.selected} onClick={() => setPanel('home')}>
        <Group align="center">
          <IconList size={20} />
          <Text fw={700}>My Proofs</Text>
        </Group>
      </UnstyledButton>
      <UnstyledButton>
        <Group align="center">
          <IconCheck size={20} />
          <Text fw={700}>Verify Proof</Text>
        </Group>
      </UnstyledButton>
      <UnstyledButton onClick={() => setPanel('trash')}>
        <Group align="center">
          <IconTrash size={20} />
          <Text fw={700}>Trash</Text>
        </Group>
      </UnstyledButton>
    </Stack>
  )
}

export default TopMenu;