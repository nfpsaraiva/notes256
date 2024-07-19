import { Stack } from "@mantine/core";
import { FC } from "react";
import classes from "./Menu.module.css";
import { IconInfoCircle, IconQuestionMark, IconTimeline } from "@tabler/icons-react";
import MenuItem from "./MenuItem";
import { MenuEnum } from "@/enums";

interface BottomMenuProps {
  closeMobileSidebar: () => void
}

const BottomMenu: FC<BottomMenuProps> = ({closeMobileSidebar}: BottomMenuProps) => {
  return (
    <Stack gap={"xs"} className={classes.menu}>
      <MenuItem closeMobileSidebar={closeMobileSidebar} name={MenuEnum.HOW_IT_WORKS} icon={<IconQuestionMark size={20} />} />
      <MenuItem closeMobileSidebar={closeMobileSidebar} name={MenuEnum.ROADMAP} icon={<IconTimeline size={20} />} />
      <MenuItem closeMobileSidebar={closeMobileSidebar} name={MenuEnum.ABOUT} icon={<IconInfoCircle size={20} />} />
    </Stack>
  )
}

export default BottomMenu;