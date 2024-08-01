import { Button, Group, Stack, Title } from "@mantine/core";
import { FC } from "react";

interface HomeHeroProps {
  scrollAbout: any
}

const HomeHero: FC<HomeHeroProps> = ({ scrollAbout }: HomeHeroProps) => {
  return (
    <Stack gap={50} align='center'>
      <Stack align='center' gap={"xs"}>
        <Title size={60}> Your Notes, Your Way</Title>
        <Title order={2} size={"h3"} c={"dimmed"}>Locally, Online, or On-Chain</Title>
      </Stack>
      <Group>
        <Button
          px={50}
          radius={"xl"}
          size='lg'
          variant='gradient'
          component='a'
          href='https://app.notes256.com'
          target='_blank'
        >
          Launch App
        </Button>

        <Button
          px={50}
          radius={"xl"}
          size='lg'
          variant='outline'
          onClick={() => scrollAbout({ alignment: "center" })}
        >
          Read More
        </Button>

      </Group>
    </Stack>
  )

}

export default HomeHero;