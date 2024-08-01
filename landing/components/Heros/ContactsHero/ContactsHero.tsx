import { ActionIcon, Anchor, Button, Group, Stack, Text, Title } from "@mantine/core";
import { IconBrandGithub, IconBrandLinkedin } from "@tabler/icons-react";
import { FC } from "react";

const ContactsHero: FC = () => {
  return (
    <Stack align="center">
      <Group>
        <ActionIcon color="var(--mantine-color-gray-7)" variant="transparent" component="a" target="_blank" href="https://www.linkedin.com/in/nfpsaraiva/">
          <IconBrandLinkedin />
        </ActionIcon>
        <ActionIcon color="var(--mantine-color-gray-7)" variant="transparent" component="a" target="_blank" href="https://github.com/nfpsaraiva/">
          <IconBrandGithub />
        </ActionIcon>
      </Group>
      <Text c={"dimmed"}>
        <Anchor
          href="https://nfpsaraiva.com"
          target="_blank"
          underline={"never"}
          c={"dimmed"}
        >
          nfpsaraiva.com
        </Anchor> &bull; @2024 &bull; Notes256.com
      </Text>
    </Stack>
  )
}

export default ContactsHero;