import { Card, Group, Stack, Text, Title } from "@mantine/core";
import { IconCloud, IconCube, IconDeviceMobile } from "@tabler/icons-react";
import { FC } from "react";

const FeaturesHero: FC = () => {
  const types = [
    {
      title: "Local Notes",
      description: (
        <>
          <Text>
            <strong>Privacy and Security:</strong> Users can keep their notes private, without relying on external servers.
          </Text>
          <Text>
            <strong>Offline Access:</strong> Notes can be accessed and edited even without an internet connection.
          </Text>
          <Text>
            <strong>Speed:</strong> Faster access to notes since no network calls are needed.
          </Text>
        </>
      ),
      icon: <IconDeviceMobile size={40} />
    },
    {
      title: "Web Notes",
      description: (
        <>
          <Text>
            <strong>Accessibility:</strong> Users can access their notes from any device by logging into their account.
          </Text>
          <Text>
            <strong>Convenience:</strong> Easy synchronization across multiple devices.
          </Text>
          <Text>
            <strong>Backup:</strong> Reduced risk of data loss as notes are stored on remote servers.
          </Text>
        </>
      ),
      icon: <IconCloud size={40} />
    },
    {
      title: "Block Notes",
      description: (
        <>
          <Text>
            <strong>Immutable Proof:</strong> Notes stored on the blockchain cannot be altered, providing a timestamped proof of existence.
          </Text>
          <Text>
            <strong>Ownership:</strong> Issuing an NFT as a certificate provides a unique and verifiable proof of ownership.
          </Text>
          <Text>
            <strong>Decentralization:</strong> Reduces reliance on a single point of failure or trust.
          </Text>
        </>
      ),
      icon: <IconCube size={40} />
    }
  ]

  return (
    <Stack maw={1100} gap={100}>
      <Stack align="center">
        <Title>Features</Title>
        <Text c={"dimmed"}>
          Our app offers a unique blend of flexibility and security by allowing you to store your notes in three different modes:
        </Text>
        <Text>
          Whether you’re jotting down personal reminders, brainstorming ideas, or documenting important information, Notes256 ensures that your notes are safe, accessible, and tamper-proof. Our user-friendly interface, coupled with robust security features, makes it easier than ever to manage your notes across different platforms.
        </Text>
      </Stack>
      <Group gap={"md"}>
        {
          types.map(type => {
            return (
              <Card h={400} p={"xl"} w={350} shadow="lg" radius={"lg"}>
                <Stack gap={"xl"}>
                  <Stack justify="space-between">
                    {type.icon}
                    <Title c={"blue"} order={2}>{type.title}</Title>
                  </Stack>
                  <Stack c={"dimmed"}>
                    {type.description}
                  </Stack>
                </Stack>
              </Card>
            )
          })
        }
      </Group>
    </Stack>
  )
}

export default FeaturesHero;