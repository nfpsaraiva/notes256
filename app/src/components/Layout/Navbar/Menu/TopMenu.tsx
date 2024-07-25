import { Divider, Stack } from "@mantine/core";
import { IconArchive, IconCube, IconFile, IconFiles, IconKey, IconNetwork, IconNotes, IconTrash } from "@tabler/icons-react";
import { FC } from "react";
import classes from "./Menu.module.css";
import MenuItem from "./MenuItem";
import { MenuEnum } from "@/enums";

const TopMenu: FC = () => {
  return (
    <Stack gap={4} className={classes.menu}>
      <MenuItem name={MenuEnum.NFTS} path="/nfts" icon={<IconCube size={18} />} />
      <MenuItem name={MenuEnum.OWNERSHIP} path="/ownership" icon={<IconKey size={18} />} />
      <Divider my={"sm"} />
      <MenuItem name={MenuEnum.NOTES} path="/" icon={<IconFiles size={18} />} />
      <MenuItem name={MenuEnum.ARCHIVE} path="/archive" icon={<IconArchive size={18} />} />
      <MenuItem name={MenuEnum.TRASH} path="/trash" icon={<IconTrash size={18} />} />
    </Stack>
  )
}

export default TopMenu;