import { Group, Stack, Text, UnstyledButton } from "@mantine/core";
import { FC } from "react";
import classes from "./Menu.module.css";
import { IconHeadset, IconInfoCircle, IconQuestionMark } from "@tabler/icons-react";

const Menu: FC = () => {
  return (
    <Stack gap="xs" className={classes.menu}>
      <UnstyledButton>
        <Group align="center">
          <IconQuestionMark size={20} />
          <Text fw={700}>How it works</Text>
        </Group>
      </UnstyledButton>
      <UnstyledButton>
        <Group align="center">
          <IconHeadset size={20} />
          <Text fw={700}>Support</Text>
        </Group>
      </UnstyledButton>
      <UnstyledButton>
        <Group align="center">
          <IconInfoCircle size={20} />
          <Text fw={700}>About</Text>
        </Group>
      </UnstyledButton>
    </Stack>
  )
}

export default Menu;