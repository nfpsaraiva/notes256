import { Stack } from "@mantine/core";
import { IconCheck, IconCompass, IconFiles, IconNavigation, IconSearch } from "@tabler/icons-react";
import { FC } from "react";
import classes from "./Menu.module.css";
import MenuItem from "./MenuItem";
import { MenuEnum } from "@/enums";

const TopMenu: FC = () => {
  return (
    <Stack gap={4} className={classes.menu}>
      <MenuItem name={MenuEnum.EXPLORE} path="/explore" icon={<IconCompass size={20} />} />
      <MenuItem name={MenuEnum.MY_PROOFS} path="/" icon={<IconFiles size={20} />} />
      <MenuItem name={MenuEnum.VERIFY} path="/search" icon={<IconCheck size={20} />} />
    </Stack>
  )
}

export default TopMenu;