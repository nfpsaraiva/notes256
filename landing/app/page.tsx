import { Affix, BackgroundImage, Box, Center, Group, Stack, Text, Title } from '@mantine/core';
import backgroundIamge from '../assets/coming-soon-background.png';

export default function HomePage() {
  return (
    <BackgroundImage src={backgroundIamge.src}>
      <Center h={"100vh"}>
        <Stack gap={260} align='center'>

          <Stack gap={4} align='center'>
            <Title size={90}>
              <Text
                inherit
                fw={900}
                variant='gradient'
                gradient={{ from: 'blue.9', to: 'gray.7' }}
              >
                Notes256
              </Text>
            </Title>
            <Text
              fw={700}
              ff={"monospace"}
              size='xl'
              c={"var(--mantine-color-dark-6)"}
            >Notes on the blockchain
            </Text>
          </Stack>

          <Title order={2} size={50}>
            <Text
              inherit
              fw={700}
              c={"var(--mantine-color-gray-2)"}
            >
              Coming soon
            </Text>
          </Title>
        </Stack>
      </Center>
    </BackgroundImage>
  );
}
