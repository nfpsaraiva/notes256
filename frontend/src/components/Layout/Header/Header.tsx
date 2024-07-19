import { WalletButton } from "@/features";
import { Burger, Group } from "@mantine/core";
import { FC } from "react";

interface HeaderProps {
  sidebarOpened: boolean,
  sidebarToggle: () => void
}

const Header: FC<HeaderProps> = ({ sidebarOpened, sidebarToggle }: HeaderProps) => {
  return (
    <>
      <Group justify="flex-end" h="100%" px="md" wrap="nowrap" visibleFrom="sm">
        <WalletButton />
      </Group>
      <Group justify="space-between" h="100%" px="md" wrap="nowrap" hiddenFrom="sm">
        <Burger opened={sidebarOpened} onClick={sidebarToggle} size="sm" />
        <WalletButton />
      </Group>
    </>
  )
}

export default Header;