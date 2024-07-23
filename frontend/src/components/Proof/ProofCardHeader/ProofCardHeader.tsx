import { Proof } from "@/types";
import { Group, Stack, Text, Title } from "@mantine/core";
import { FC } from "react";

interface ProofCardHeaderProps {
  proof: Proof
}

const ProofCardHeader: FC<ProofCardHeaderProps> = ({ proof }: ProofCardHeaderProps) => {
  return (
      <Stack gap={4}>
        <Title order={3} size={"h5"} lineClamp={1}>{proof.name}</Title>
        <Text c={"dimmed"} size="xs" fw={500}>
          {proof.date.toLocaleDateString()} {proof.date.toLocaleTimeString()}
        </Text>
      </Stack>
  )
}

export default ProofCardHeader;