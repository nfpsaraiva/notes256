import { Button, Group, Stack, UnstyledButton } from "@mantine/core";
import { FC } from "react";
import classes from "./Menu.module.css"

const Menu: FC = () => {
  return (
    <Stack className={classes.menu}>
      <UnstyledButton>How it works</UnstyledButton>
      <UnstyledButton>Support</UnstyledButton>
      <UnstyledButton>About</UnstyledButton>
    </Stack>
  )
}

export default Menu;