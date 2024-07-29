import { Menu } from "@mantine/core";
import { IconTrash } from "@tabler/icons-react";
import { FC } from "react";

const NoteMenu: FC = () => {
  return (
    <Menu.Dropdown>
      <Menu.Item leftSection={<IconTrash size={18} />} color="red">
        Delete
      </Menu.Item>
    </Menu.Dropdown>
  )
}

export default NoteMenu;