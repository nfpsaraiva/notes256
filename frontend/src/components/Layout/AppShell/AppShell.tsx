import { Container, AppShell as MantineAppShell } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { FC, ReactNode } from "react";
import Header from '../Header/Header';
import Navbar from '../Navbar/Navbar';
import classes from "./AppShell.module.css";

interface AppShellProps {
  children: ReactNode
}

const AppShell: FC<AppShellProps> = ({ children }: AppShellProps) => {
  const [opened, { toggle, close }] = useDisclosure();

  return (
    <MantineAppShell
      layout="alt"
      header={{ height: 60 }}
      navbar={{ width: 300, breakpoint: 'sm', collapsed: { desktop: opened, mobile: !opened } }}
      padding="md"
    >
      <MantineAppShell.Header className={classes.header} withBorder={false}>
        <Header sidebarOpened={opened} sidebarToggle={toggle} />
      </MantineAppShell.Header>

      <MantineAppShell.Navbar withBorder={true} className={classes.navbar}>
        <Navbar sidebarOpened={opened} sidebarToggle={toggle} sidebarClose={close} />
      </MantineAppShell.Navbar>

      <MantineAppShell.Main className={classes.main}>
        <Container maw={1000} mx={"auto"}>
          {children}
        </Container>
      </MantineAppShell.Main>

    </MantineAppShell>
  )
}

export default AppShell;