import { Proof } from "@/types";
import { shortifyAddress } from "@/utils/proofUtils";
import { Badge, CopyButton, Group, Stack, Text, Title, Tooltip } from "@mantine/core";
import { FC } from "react";

interface ProofCardHeaderProps {
  proof: Proof
}

const ProofCardHeader: FC<ProofCardHeaderProps> = ({ proof }: ProofCardHeaderProps) => {
  return (
    <Group justify="space-between">
      <Stack gap={4}>
        <Title order={3} size={"h4"}>{proof.name}</Title>
        <Text c={"dimmed"} size="xs" fw={500}>
          {proof.date.toLocaleDateString()} {proof.date.toLocaleTimeString()}
        </Text>
      </Stack>
      <CopyButton value={proof.issuer} timeout={2000}>
        {({ copied, copy }) => (
          <Tooltip label={copied ? 'Copied' : 'Copy Author'} withArrow>
            <Badge size="xs" variant="light" style={{cursor: "pointer"}} onClick={e => {
              e.stopPropagation();
              copy();
            }}>
              {shortifyAddress(proof.issuer)}
            </Badge>
          </Tooltip>
        )}
      </CopyButton>
    </Group>
  )
}

export default ProofCardHeader;