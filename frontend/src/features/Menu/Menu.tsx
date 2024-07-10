import { Group, Stack, Text, UnstyledButton } from "@mantine/core";
import { FC } from "react";
import classes from "./Menu.module.css";
import { IconHeadset, IconInfoCircle, IconQuestionMark, IconTimeline } from "@tabler/icons-react";
import MenuItem from "./MenuItem";

const Menu: FC = () => {
  return (
    <Stack gap="xs" className={classes.menu}>
      <MenuItem name="how-it-works" label="How it works" icon={<IconQuestionMark size={20} />} />
      <MenuItem name="roadmap" label="Roadmap" icon={<IconTimeline size={20} />} />
      <MenuItem name="about" label="About" icon={<IconInfoCircle size={20} />} />
    </Stack>
  )
}

export default Menu;