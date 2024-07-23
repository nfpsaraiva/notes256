import { Proof } from "@/types";
import { ScrollArea, Stack, Text, Title } from "@mantine/core";
import { FC } from "react";
import ProofCardHeader from "../ProofCardHeader/ProofCardHeader";

interface ProofContentProps {
  proof: Proof,
  expanded: boolean
}

const ProofContent: FC<ProofContentProps> = ({ proof, expanded = false }: ProofContentProps) => {
  return (
    <Stack gap={"lg"} h={"100%"} mb={"lg"}>
      <Stack gap={4}>
        <Title order={3} fw={600} size={"h5"} lineClamp={expanded ? 3 : 2}>{proof.name}</Title>
        {
          proof.date &&
          <Text c={"dimmed"} size="xs" fw={500}>
            {proof.date.toLocaleDateString()} {proof.date.toLocaleTimeString()}
          </Text>
        }
      </Stack>
      {
        expanded
          ? <ScrollArea h={300}>
            <Text fw={300} size="xs" lh={1.6}>
              {proof.description}
            </Text>
          </ScrollArea>
          : <Text fw={400} lineClamp={5} size="xs" lh={1.6}>
            {proof.description}
          </Text>
      }
    </Stack>
  )
}

export default ProofContent;