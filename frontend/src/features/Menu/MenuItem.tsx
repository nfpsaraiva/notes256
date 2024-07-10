import useStore from "@/stores/provifyStore";
import { Group, Text, UnstyledButton } from "@mantine/core";
import { FC, ReactNode } from "react";
import { useShallow } from "zustand/react/shallow";
import classes from "./Menu.module.css";

interface MenuItemProps {
  name: string,
  label: string,
  icon: ReactNode
}

const MenuItem: FC<MenuItemProps> = ({
  name,
  label,
  icon
}: MenuItemProps) => {
  const [
    panel,
    setPanel
  ] = useStore(useShallow(state => [
    state.panel,
    state.setPanel,
  ]));

  const getActiveClass = (menu: string) => {
    if (menu === panel) {
      return classes.selected;
    }

    return '';
  }

  return (
    <UnstyledButton
      className={getActiveClass(name)}
      onClick={() => setPanel(name)}
    >
      <Group align="center">
        {icon}
        <Text fw={700}>{label}</Text>
      </Group>
    </UnstyledButton>
  )
}

export default MenuItem;