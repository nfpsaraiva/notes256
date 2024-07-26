import { SidebarToggle } from "@/components/Common";
import UserMenu from "@/components/Common/UserMenu/UserMenu";
import { Burger, Group } from "@mantine/core";
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
        {
          !sidebarOpened
            ? <Group justify="flex-end" w={"100%"}>
              {userMenu}
            </Group>
            : <Group justify="space-between" w={"100%"}>
              <SidebarToggle toggle={sidebarToggle} />
              {userMenu}
            </Group>
        }
      </Group>
      <Group justify="space-between" h="100%" px="lg" mt={7} wrap="nowrap" hiddenFrom="sm">
        <Burger opened={sidebarOpened} onClick={sidebarToggle} size="sm" />
        {userMenu}
      </Group>
    </>
  )
}

export default Header;