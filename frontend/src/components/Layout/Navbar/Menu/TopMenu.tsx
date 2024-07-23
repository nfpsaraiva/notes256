import { Divider, Stack } from "@mantine/core";
import { IconCertificate, IconCheck, IconCompass, IconFile } from "@tabler/icons-react";
import { FC } from "react";
import classes from "./Menu.module.css";
import MenuItem from "./MenuItem";
import { MenuEnum } from "@/enums";

const TopMenu: FC = () => {
  return (
    <Stack gap={4} className={classes.menu}>
      <MenuItem name={MenuEnum.MY_PROOFS} path="/" icon={<IconCertificate size={20} />} />
      <MenuItem name={MenuEnum.MY_DRAFTS} path="/drafts" icon={<IconFile size={20} />} />
      <Divider label="Community" my={"xs"} />
      <MenuItem name={MenuEnum.EXPLORE} path="/explore" icon={<IconCompass size={20} />} />
    </Stack>
  )
}

export default TopMenu;