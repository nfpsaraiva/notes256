import useStore from "@/stores/store";
import { Group, Text, UnstyledButton } from "@mantine/core";
import { FC, ReactNode } from "react";
import { useShallow } from "zustand/react/shallow";
import classes from "./Menu.module.css";

interface MenuItemProps {
  name: string,
  icon: ReactNode,
  closeMobileSidebar: () => void
}

const MenuItem: FC<MenuItemProps> = ({
  name,
  icon,
  closeMobileSidebar
}: MenuItemProps) => {
  const [panel, setPanel] = useStore(useShallow(state => [state.panel, state.setPanel]));

  const selected = name === panel ? classes.selected : '';

  const activateMenu = (name: string) => {
    setPanel(name);
    closeMobileSidebar();
  }

  return (
    <UnstyledButton className={selected} onClick={() => activateMenu(name)}>
      <Group align="center">
        {icon}
        <Text fw={700}>{name}</Text>
      </Group>
    </UnstyledButton>
  )
}

export default MenuItem;