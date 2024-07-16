import SidebarToggle from "@/components/Common/SidebarToggle/SidebarToggle";
import { AppShell, Box, Burger, Group, ScrollArea, Title } from "@mantine/core";
import { FC } from "react";
import { BottomMenu, TopMenu } from "./Menu";
import { ColorSchemeToggle } from "@/components/Common";

interface NavbarProps {
  sidebarOpened: boolean,
  sidebarToggle: () => void,
  sidebarClose: () => void
}

const Navbar: FC<NavbarProps> = ({ sidebarOpened, sidebarToggle, sidebarClose }: NavbarProps) => {
  return (
    <>
      <AppShell.Section p={"md"}>
        <Group justify='space-between'>
          <Group>
            <Burger opened={sidebarOpened} onClick={sidebarToggle} hiddenFrom="sm" size="sm" />
            <Title size={"h3"}>Provify</Title>
          </Group>
          <Group>
            <ColorSchemeToggle />
            <Box visibleFrom="sm">
              <SidebarToggle toggle={sidebarToggle} />
            </Box>
          </Group>
        </Group>
      </AppShell.Section>
      <AppShell.Section grow py={"md"} px={0} component={ScrollArea}>
        <TopMenu closeMobileSidebar={sidebarClose} />
      </AppShell.Section>
      <AppShell.Section py={"md"} px={0}>
        <BottomMenu closeMobileSidebar={sidebarClose} />
      </AppShell.Section>
    </>
  )
}

export default Navbar;