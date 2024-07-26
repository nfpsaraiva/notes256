import { Divider, Stack } from "@mantine/core";
import { IconCloud, IconCube, IconDeviceMobile, IconFiles, IconGizmo } from "@tabler/icons-react";
import { FC } from "react";
import classes from "./Menu.module.css";
import MenuItem from "./MenuItem";
import { MenuEnum } from "@/enums";
import { useUserbase } from "@/contexts";
import { useNotes } from "@/features/Notes/hooks";
import { useNfts } from "@/features/Nfts/hooks";

const TopMenu: FC = () => {
  const {notes} = useUserbase();
  const {notes: localNotes} = useNotes();
  const { nfts, isFetching, refetch } = useNfts();

  
  const decentralizedNotesCount = nfts ? nfts.length : 0;
  const cloudNotesCount = notes ? notes.length : 0;
  const localNotesCount = localNotes ? localNotes.length : 0;

  return (
    <Stack gap={4} className={classes.menu}>
      <Divider mb={"lg"}  />
      <MenuItem name={`${MenuEnum.NFTS} (${cloudNotesCount})`} path="/nfts" icon={<IconGizmo size={18} />} />
      <MenuItem name={`${MenuEnum.NOTES} (${cloudNotesCount})`} path="/" icon={<IconCloud size={18} />} />
      <MenuItem name={`${MenuEnum.LOCAL_NOTS} (${localNotesCount})`} path="/local" icon={<IconDeviceMobile size={18} />} />
    </Stack>
  )
}

export default TopMenu;