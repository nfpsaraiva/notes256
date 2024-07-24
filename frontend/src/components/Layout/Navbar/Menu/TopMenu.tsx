import { Stack } from "@mantine/core";
import { IconFile, IconNotes } from "@tabler/icons-react";
import { FC } from "react";
import classes from "./Menu.module.css";
import MenuItem from "./MenuItem";
import { MenuEnum } from "@/enums";

const TopMenu: FC = () => {
  return (
    <Stack gap={4} className={classes.menu}>
      <MenuItem name={MenuEnum.NOTES} path="/" icon={<IconNotes size={20} />} />
      <MenuItem name={MenuEnum.DRAFTS} path="/drafts" icon={<IconFile size={20} />} />
    </Stack>
  )
}

export default TopMenu;