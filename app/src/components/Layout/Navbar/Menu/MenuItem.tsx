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
  
  const requestedPage = `/${path.split('/')[1]}`;
  const page = `/${pathname.split('/')[1]}`;

  const selected = requestedPage === page ? classes.selected : '';

  return (
    <NavLink to={path} className={selected}>
      <Group>
        {icon}
        <Text size="sm" fw={700}>{name}</Text>
      </Group>
    </NavLink>
  )
}

export default MenuItem;