import { Affix, Anchor, BackgroundImage, Box, Center, Group, Image, Stack, Text, Title } from '@mantine/core';
import backgroundIamge from '../../assets/coming-soon-background.png';

export default function HomePage() {

  const desktop = (
    <>
      <Affix visibleFrom='sm' top={100} left={100}>
        <Group wrap='nowrap' gap={4}>
          <Stack gap={0} w={"100%"}>
            <Title size={50}>
              <Text
                inherit
                fw={900}
                c={"var(--mantine-color-gray-8)"}

              >
                Notes256
              </Text>
            </Title>
            <Text
              fw={700}
              ff={"monospace"}
              size='xl'
              c={"var(--mantine-color-dark-6)"}
            >
              Notes on the blockchain
            </Text>
          </Stack>
        </Group>
      </Affix>
      <Affix visibleFrom='sm' bottom={100} right={100}>
        <Stack gap={"xs"}>

          <Title order={2} size={30}>
            <Text
              inherit
              fw={700}
              c={"var(--mantine-color-gray-2)"}
            >
              Coming soon
            </Text>
          </Title>
          <Anchor
            fw={700}
            ff={"monospace"}
            size='sm'
            c={"var(--mantine-color-gray-2)"}
            href='https://nfpsaraiva.com'
            target='_blank'
          >
            nfpsaraiva.com
          </Anchor>
        </Stack>
      </Affix>
    </>
  )

  const mobile = (
    <Stack hiddenFrom='sm' gap={200} align='center'>
      <Group gap={4}>
        <Stack gap={0}>
          <Title size={50}>
            <Text
              inherit
              fw={900}
              c={"var(--mantine-color-gray-8)"}

            >
              Notes256
            </Text>
          </Title>
          <Text
            fw={700}
            ff={"monospace"}
            size='xs'
            c={"var(--mantine-color-dark-6)"}
          >Notes on the blockchain
          </Text>
        </Stack>
      </Group>
      <Stack align='center' gap={"xs"}>
        <Title order={3} size={30}>
          <Text
            inherit
            fw={700}
            c={"var(--mantine-color-gray-2)"}
          >
            Coming soon
          </Text>
        </Title>
        <Anchor
          fw={700}
          ff={"monospace"}
          size='sm'
          c={"var(--mantine-color-gray-2)"}
          href='https://nfpsaraiva.com'
          target='_blank'
        >
          nfpsaraiva.com
        </Anchor>
      </Stack>
    </Stack>
  )

  return (
    <BackgroundImage src={backgroundIamge.src}>
      <Center h={"100vh"}>
        <Box>{desktop}</Box>
        <Box>{mobile}</Box>
      </Center>
    </BackgroundImage>
  );
}
