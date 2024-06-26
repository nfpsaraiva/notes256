import { Burger, Card, Container, Group, Stack, Text, Title, UnstyledButton } from "@mantine/core";
import { FC } from "react";
import classes from "./Menu.module.css";
import { IconCertificate } from "@tabler/icons-react";
import WalletButton from "../Wallet/WalletButton";

const Menu: FC = () => {
  return (
    <Container fluid className={classes.menu}>
      <Card radius={"xl"} className={classes.menuPainel}>
        <Group h="100%" px="lg">
          <Group justify="space-between" style={{ flex: 1 }}>
            <Group>
              <IconCertificate />
              <Stack gap={2}>
                <Title size={"h2"}>Provify</Title>
                <Text size='xs' c={"dimmed"}>Ethereum network</Text>
              </Stack>
            </Group>
            <Group>
              <Group gap="xs" visibleFrom="sm">
                <UnstyledButton className={classes.control}>About</UnstyledButton>
                <UnstyledButton className={classes.control}>Team</UnstyledButton>
                <UnstyledButton className={classes.control}>How it works</UnstyledButton>
              </Group>
              <WalletButton />
            </Group>
          </Group>
        </Group>
      </Card>
    </Container>
  )
}

export default Menu;