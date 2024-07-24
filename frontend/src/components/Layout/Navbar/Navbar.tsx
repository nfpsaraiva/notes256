import { AppShell, Badge, Burger, Divider, Group, Image, ScrollArea, Stack, Title } from "@mantine/core";
import { FC } from "react";
import { BottomMenu, TopMenu } from "./Menu";
import { ColorSchemeToggle, NetworkSwitcher } from "@/components/Common";
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
            <Group gap={"xs"}>
              <Image src={appIcon} w={24} />
              <Title size={"h3"}>Notes256</Title>
              <Badge size="xs" variant="transparent">Alpha</Badge>
            </Group>
          </Group>
          <ColorSchemeToggle />
        </Group>
      </AppShell.Section>
      <AppShell.Section grow px={"lg"} component={ScrollArea}>
        <Stack py={"md"} gap={"xl"}>
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