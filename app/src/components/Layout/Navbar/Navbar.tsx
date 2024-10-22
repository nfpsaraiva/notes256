import { AppShell, Box, Burger, Group, Image, ScrollArea, Stack, Title } from "@mantine/core";
import { FC } from "react";
import { BottomMenu, TopMenu } from "./Menu";
import { ColorSchemeToggle, SidebarToggle } from "@/components/Common";
import appIcon from "../../../assets/app-icon.png";
import { useNavigate } from "react-router-dom";

interface NavbarProps {
  sidebarOpened: boolean,
  sidebarToggle: () => void,
  sidebarClose: () => void
}

const Navbar: FC<NavbarProps> = ({ sidebarOpened, sidebarToggle }: NavbarProps) => {
  const navigate = useNavigate();

  return (
    <>
      <AppShell.Section p={"lg"}>
        <Group justify='space-between'>
          <Group flex={1}>
            <Burger opened={sidebarOpened} onClick={sidebarToggle} hiddenFrom="sm" size="sm" />
            <Group gap={"sm"} styles={{root: {cursor: "pointer"}}} onClick={() => navigate('/')}>
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
          <TopMenu />
        </Stack>
      </AppShell.Section>
      <AppShell.Section p={"lg"}>
        <Stack>
          {/* <Divider /> */}
          <BottomMenu />
        </Stack>
      </AppShell.Section>
    </>
  )
}

export default Navbar;