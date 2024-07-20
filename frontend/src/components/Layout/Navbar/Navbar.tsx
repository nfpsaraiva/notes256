import { AppShell, Burger, Divider, Group, ScrollArea, Stack, Title } from "@mantine/core";
import { FC } from "react";
import { BottomMenu, TopMenu } from "./Menu";
import { ColorSchemeToggle } from "@/components/Common";
import { IconCertificate } from "@tabler/icons-react";

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
              <IconCertificate size={20} />
              <Title size={"h3"}>Provify</Title>
            </Group>
          </Group>
          <Group>
            <ColorSchemeToggle />
          </Group>
        </Group>
      </AppShell.Section>
      <AppShell.Section grow p={"lg"} component={ScrollArea}>
        <TopMenu />
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