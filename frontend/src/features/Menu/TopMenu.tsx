import { Stack } from "@mantine/core";
import { IconCheck, IconList, IconTrash } from "@tabler/icons-react";
import { FC } from "react";
import classes from "./Menu.module.css";
import MenuItem from "./MenuItem";

const TopMenu: FC = () => {
  return (
    <Stack gap="xs" className={classes.menu}>
      <MenuItem name="home" label="My proofs" icon={<IconList size={20} />} />
      <MenuItem name="verify" label="Verify" icon={<IconCheck size={20} />} />
      <MenuItem name="trash" label="Trash" icon={<IconTrash size={20} />} />
    </Stack>
  )
}

export default TopMenu;