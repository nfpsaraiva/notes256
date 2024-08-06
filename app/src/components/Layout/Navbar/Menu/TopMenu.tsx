import { Divider, Stack } from "@mantine/core";
import { IconCloud, IconCube, IconDeviceMobile, IconSmartHome } from "@tabler/icons-react";
import { FC } from "react";
import classes from "./Menu.module.css";
import MenuItem from "./MenuItem";
import { MenuEnum, Path } from "@/enums";
import { useBlockNotes, useLocalNotes, useWebNotes } from "@/hooks";

const TopMenu: FC = () => {
  const { notes } = useWebNotes();
  const { localNotes } = useLocalNotes();
  const { blockNotes } = useBlockNotes();

  const decentralizedNotesCount = blockNotes ? blockNotes.length : 0;
  const cloudNotesCount = notes ? notes.length : 0;
  const localNotesCount = localNotes ? localNotes.length : 0;

  return (
    <Stack gap={4} className={classes.menu}>
      <MenuItem name={MenuEnum.HOME} path={Path.HOME} icon={<IconSmartHome size={18} />} />
      <Divider my={"md"} />
      <MenuItem name={`${MenuEnum.BLOCK_NOTES} (${decentralizedNotesCount})`} path={Path.BLOCK_NOTES} icon={<IconCube size={18} />} />
      <MenuItem name={`${MenuEnum.WEB_NOTES} (${cloudNotesCount})`} path={Path.WEB_NOTES} icon={<IconCloud size={18} />} />
      <MenuItem name={`${MenuEnum.LOCAL_NOTES} (${localNotesCount})`} path={Path.LOCAL_NOTES} icon={<IconDeviceMobile size={18} />} />
    </Stack>
  )
}

export default TopMenu;