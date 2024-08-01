import { SidebarToggle } from "@/components/Common";
import { Badge, Burger, Group } from "@mantine/core";
import { FC, ReactNode } from "react";

interface HeaderProps {
  sidebarOpened: boolean,
  sidebarToggle: () => void,
  userMenu: ReactNode
}

const Header: FC<HeaderProps> = ({ sidebarOpened, sidebarToggle, userMenu }: HeaderProps) => {
  return (
    <>
      <Group h="100%" px="md" mt={7} wrap="nowrap" visibleFrom="sm">
        <Group justify="space-between" w={"100%"}>
          <Group>
            {
              sidebarOpened && <SidebarToggle toggle={sidebarToggle} />
            }
            <Badge variant="transparent" size="sm">ALPHA</Badge>
          </Group>
          {userMenu}
        </Group>
      </Group>
      <Group justify="space-between" h="100%" px="lg" mt={7} wrap="nowrap" hiddenFrom="sm">
        <Group>
          <Burger opened={sidebarOpened} onClick={sidebarToggle} size="sm" />
          <Badge variant="transparent" size="sm">ALPHA</Badge>
        </Group>
        {userMenu}
      </Group>
    </>
  )
}

export default Header;