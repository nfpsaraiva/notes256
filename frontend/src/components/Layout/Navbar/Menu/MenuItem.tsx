import { Group, Text } from "@mantine/core";
import { FC, ReactNode } from "react";
import classes from "./Menu.module.css";
import { NavLink, useLocation } from "react-router-dom";

interface MenuItemProps {
  name: string,
  path: string,
  icon: ReactNode,
}

const MenuItem: FC<MenuItemProps> = ({
  name,
  path,
  icon,
}: MenuItemProps) => {
  const { pathname } = useLocation();

  const selected = path === pathname ? classes.selected : '';

  return (
    <NavLink to={path} className={selected}>
      <Group>
        {icon}
        <Text fw={700}>{name}</Text>
      </Group>
    </NavLink>
  )
}

export default MenuItem;