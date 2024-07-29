import { Divider, Stack } from "@mantine/core";
import { IconCloud, IconDeviceMobile, IconGizmo, IconHome } from "@tabler/icons-react";
import { FC } from "react";
import classes from "./Menu.module.css";
import MenuItem from "./MenuItem";
import { MenuEnum } from "@/enums";
import { useUserbase } from "@/contexts";
import { useLocalNotes } from "@/hooks";
import useBlockNotes from "@/hooks/useBlockNotes";

const TopMenu: FC = () => {
  const { notes } = useUserbase();
  const { localNotes } = useLocalNotes();
  const { blockNotes } = useBlockNotes();

  const decentralizedNotesCount = blockNotes ? blockNotes.length : 0;
  const cloudNotesCount = notes ? notes.length : 0;
  const localNotesCount = localNotes ? localNotes.length : 0;

  return (
    <Stack gap={4} className={classes.menu}>
      <MenuItem name={`${MenuEnum.BLOCK_NOTES} (${decentralizedNotesCount})`} path="/" icon={<IconGizmo size={18} />} />
      <MenuItem name={`${MenuEnum.WEB_NOTES} (${cloudNotesCount})`} path="/web-notes" icon={<IconCloud size={18} />} />
      <MenuItem name={`${MenuEnum.LOCAL_NOTES} (${localNotesCount})`} path="/local-notes" icon={<IconDeviceMobile size={18} />} />
    </Stack>
  )
}

export default TopMenu;