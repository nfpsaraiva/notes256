import { FC, ReactNode } from "react";
import { AppShell as MantineAppShell, UnstyledButton } from "@mantine/core";
import Header from "../Header/Header";
import { useDisclosure, useHeadroom, useScrollIntoView } from "@mantine/hooks";
import classes from "./AppShell.module.css"

interface AppShellProps {
  scrollHome: any,
  scrollAbout: any,
  scrollContacts: any
  children: ReactNode,
}

const AppShell: FC<AppShellProps> = ({ scrollHome, scrollAbout, scrollContacts, children }: AppShellProps) => {
  const [opened, { toggle }] = useDisclosure();
  const pinned = useHeadroom();

  return (
    <MantineAppShell
      header={{ height: 100, collapsed: !pinned, offset: false }}
      navbar={{ width: 300, breakpoint: 'sm', collapsed: { desktop: true, mobile: !opened } }}
      padding={0}
      withBorder={false}
      className={classes.shell}
    >
      <MantineAppShell.Header className={classes.header}>
        <Header
          scrollHome={scrollHome}
          scrollAbout={scrollAbout}
          scrollContacts={scrollContacts}
          opened={opened}
          toggle={toggle}
        />
      </MantineAppShell.Header>

      <MantineAppShell.Navbar py="md" px={4}>
        <UnstyledButton onClick={() => scrollAbout({ aligment: "center" })} className={classes.control}>About</UnstyledButton>
        <UnstyledButton className={classes.control}>Contacts</UnstyledButton>
      </MantineAppShell.Navbar>

      <MantineAppShell.Main>
        {children}
      </MantineAppShell.Main>
    </MantineAppShell>
  )
}

export default AppShell;