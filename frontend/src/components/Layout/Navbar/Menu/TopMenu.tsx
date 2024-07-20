import { Stack } from "@mantine/core";
import { IconFiles, IconSearch } from "@tabler/icons-react";
import { FC } from "react";
import classes from "./Menu.module.css";
import MenuItem from "./MenuItem";
import { MenuEnum } from "@/enums";

const TopMenu: FC = () => {
  return (
    <Stack gap={4} className={classes.menu}>
      <MenuItem name={MenuEnum.MY_PROOFS} path="/" icon={<IconFiles size={20} />} />
      <MenuItem name={MenuEnum.VERIFY} path="/search" icon={<IconSearch size={20} />} />
    </Stack>
  )
}

export default TopMenu;