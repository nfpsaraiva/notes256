import { Proof } from "@/types";
import { ScrollArea, Stack, Text } from "@mantine/core";
import { FC } from "react";
import ProofCardHeader from "../ProofCardHeader/ProofCardHeader";

interface ProofContentProps {
  proof: Proof,
  expanded: boolean
}

const ProofContent: FC<ProofContentProps> = ({ proof, expanded = false }: ProofContentProps) => {
  return (
    <Stack gap={"lg"} h={"100%"}>
      <ProofCardHeader proof={proof} />
      {
        expanded
          ? <ScrollArea h={300}>
            <Text fw={300} size="xs" lh={1.6}>
              {proof.description}
            </Text>
          </ScrollArea>
          : <Text fw={300} lineClamp={5} size="xs" lh={1.6}>
            {proof.description}
          </Text>
      }
    </Stack>
  )
}

export default ProofContent;