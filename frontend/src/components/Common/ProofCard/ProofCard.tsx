import { Box, Card, Divider, Group, Image, Stack, Text } from "@mantine/core";
import { FC } from "react";
import classes from "./ProofCard.module.css";
import { Proof } from "@/types";
import { useDisclosure } from "@mantine/hooks";
import ProofModal from "../ProofModal/ProofModal";

interface ProofCardProps {
  proof: Proof
}

const ProofCard: FC<ProofCardProps> = ({ proof }: ProofCardProps) => {
  const [opened, { open, close }] = useDisclosure(false);

  const shortifyAddress = (address: string) => {
    const start = address.substring(0, 4);
    const end = address.substring(address.length - 6, address.length);

    return `${start}...${end}`;
  }

  return (
    <Box>
      <Card onClick={open} className={classes.proofCard} radius={"lg"} h={300} padding={"lg"} withBorder shadow="md">
        <Card.Section>
          <Image height={50} src={proof.image} />
        </Card.Section>
        <Stack mt={"md"} gap={"lg"} h={"100%"}>
          <Stack gap={"xs"}>
            <Text fw={700}>
              {proof.name}
            </Text>
            <Stack gap={5}>
              <Text size="xs" c={"dimmed"}>
                {proof.date.toLocaleDateString()} {proof.date.toLocaleTimeString()}
              </Text>
            </Stack>
          </Stack>
          <Text lineClamp={6} size="sm">
            {proof.description}
          </Text>
        </Stack>
      </Card>
      <ProofModal opened={opened} close={close} proof={proof} />
    </Box>
  )
}

export default ProofCard;