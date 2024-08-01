import { Anchor, Badge, Group, Stack, Text } from "@mantine/core";
import { FC } from "react";
import classes from "./Menu.module.css";
import { IconInfoCircle, IconQuestionMark, IconTimeline, IconUser, IconUsers } from "@tabler/icons-react";
import MenuItem from "./MenuItem";
import { MenuEnum } from "@/enums";

const BottomMenu: FC = () => {
  return (
    <Stack gap={4} className={classes.menu}>
      <MenuItem name={MenuEnum.HOW_IT_WORKS} path="/how-it-works" icon={<IconQuestionMark size={18} />} />
      <MenuItem name={MenuEnum.ROADMAP} path="/roadmap" icon={<IconTimeline size={18} />} />
      <MenuItem name={MenuEnum.ABOUT} path="/about" icon={<IconInfoCircle size={18} />} />
    </Stack>
  )
}

export default BottomMenu;