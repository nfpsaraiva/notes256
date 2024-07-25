import { AppShell, Badge, Box, Burger, Divider, Group, Image, Indicator, ScrollArea, Stack, Title } from "@mantine/core";
import { FC } from "react";
import { BottomMenu, TopMenu } from "./Menu";
import { ColorSchemeToggle, NetworkSwitcher, SidebarToggle } from "@/components/Common";
import appIcon from "../../../assets/app-icon.jpg";

interface NavbarProps {
  sidebarOpened: boolean,
  sidebarToggle: () => void,
  sidebarClose: () => void
}

const Navbar: FC<NavbarProps> = ({ sidebarOpened, sidebarToggle }: NavbarProps) => {
  return (
    <>
      <AppShell.Section p={"lg"}>
        <Group justify='space-between'>
          <Group flex={1}>
            <Burger opened={sidebarOpened} onClick={sidebarToggle} hiddenFrom="sm" size="sm" />
            <Group gap={"sm"}>
              <Image src={appIcon} w={24} />
              <Title size={"h3"}>Notes256</Title>
            </Group>
          </Group>
          <ColorSchemeToggle />
          <Box visibleFrom="sm">
            <SidebarToggle toggle={sidebarToggle} />
          </Box>
        </Group>
      </AppShell.Section>
      <AppShell.Section grow px={"lg"} component={ScrollArea}>
        <Stack py={"md"} gap={"lg"}>
          <NetworkSwitcher />
          <TopMenu />
        </Stack>
      </AppShell.Section>
      <AppShell.Section p={"lg"}>
        <Stack>
          <Divider />
          <BottomMenu />
        </Stack>
      </AppShell.Section>
    </>
  )
}

export default Navbar;