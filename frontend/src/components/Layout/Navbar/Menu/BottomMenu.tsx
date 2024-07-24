import { Stack } from "@mantine/core";
import { FC } from "react";
import classes from "./Menu.module.css";
import { IconInfoCircle, IconQuestionMark, IconTimeline, IconUsers } from "@tabler/icons-react";
import MenuItem from "./MenuItem";
import { MenuEnum } from "@/enums";

const BottomMenu: FC = () => {
  return (
    <Stack gap={4} className={classes.menu}>
      <MenuItem name={MenuEnum.HOW_IT_WORKS} path="/how-it-works" icon={<IconQuestionMark size={20} />} />
      <MenuItem name={MenuEnum.ROADMAP} path="/roadmap" icon={<IconTimeline size={20} />} />
      <MenuItem name={MenuEnum.TEAM} path="/team" icon={<IconUsers size={20} />} />
      <MenuItem name={MenuEnum.ABOUT} path="/about" icon={<IconInfoCircle size={20} />} />
    </Stack>
  )
}

export default BottomMenu;