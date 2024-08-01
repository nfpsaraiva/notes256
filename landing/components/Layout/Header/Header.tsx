import { Burger, Center, Group, Image, Title, UnstyledButton } from "@mantine/core";
import { FC } from "react";
import classes from "./Header.module.css"
import logo from './../../../assets/logo.png';

interface HeaderProps {
  opened: boolean,
  toggle: () => void,
  scrollHome: any,
  scrollAbout: any,
  scrollContacts: any
}

const Header: FC<HeaderProps> = ({ opened, toggle, scrollHome, scrollAbout, scrollContacts }: HeaderProps) => {
  return (
    <Group h="100%" px="md">
      <Center w={"100%"} mx={200}>
        <Burger opened={opened} onClick={toggle} hiddenFrom="sm" size="sm" />
        <Group justify="space-between" style={{ flex: 1 }}>
          <Group gap={"xs"}>
            <Image src={logo.src} w={50} />
            <Title size={20}>Notes256</Title>
          </Group>
          <Group ml="xl" gap={"xs"} visibleFrom="sm">
            <UnstyledButton onClick={() => scrollHome({ alignment: "center" })} className={classes.control}>
              Home
            </UnstyledButton>
            <UnstyledButton onClick={() => scrollAbout({ alignment: "center" })} className={classes.control}>
              Features
            </UnstyledButton>
          </Group>
        </Group>
      </Center>
    </Group>
  )
}

export default Header;