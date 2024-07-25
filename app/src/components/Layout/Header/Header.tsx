import { SidebarToggle } from "@/components/Common";
import { WalletButton } from "@/features/Wallet";
import { Burger, Group } from "@mantine/core";
import { FC } from "react";

interface HeaderProps {
  sidebarOpened: boolean,
  sidebarToggle: () => void
}

const Header: FC<HeaderProps> = ({ sidebarOpened, sidebarToggle }: HeaderProps) => {
  return (
    <>
      <Group h="100%" px="md" mt={7} wrap="nowrap" visibleFrom="sm">
        {
          !sidebarOpened
            ? <Group justify="flex-end" w={"100%"}>
              <WalletButton />
            </Group>
            : <Group justify="space-between" w={"100%"}>
              <SidebarToggle toggle={sidebarToggle} />
              <WalletButton />
            </Group>
        }
      </Group>
      <Group justify="space-between" h="100%" px="lg" mt={7} wrap="nowrap" hiddenFrom="sm">
        <Burger opened={sidebarOpened} onClick={sidebarToggle} size="sm" />
        <WalletButton />
      </Group>
    </>
  )
}

export default Header;