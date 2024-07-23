import { AppShell } from "@/components/Layout";
import { ProofCard } from "@/components/Proof";
import { MainTitle } from "@/components/UI/MainTitle";
import { useProof, useVerifyProof } from "@/hooks";
import { Alert, Box, Button, Card, Center, Group, Indicator, Loader, Paper, Stack, Text, TextInput } from "@mantine/core";
import { IconCheck, IconSearch } from "@tabler/icons-react";
import { FC, useState } from "react";

const Verify: FC = () => {
  const [address, setAddress] = useState('');
  const [proofId, setProofId] = useState('');

  const { isOwner, isLoading, refetch: fetchOwner } = useVerifyProof(address, proofId);
  const { proof, refetch: fetchProof } = useProof(proofId);

  const submit = () => {
    fetchOwner();
    fetchProof();
  }

  return (
    <AppShell>
      <Stack gap={"xl"}>
        <MainTitle title="Verify" subtitle="Validate if a proof exists" />


        <Card radius={"xl"} shadow="xs">

          <Group>
            <TextInput
              miw={200}
              placeholder={'Type the owner address'}
              size="md"
              radius={"lg"}
              value={address}
              onChange={e => setAddress(e.target.value)}
              flex={1}
            />
            <TextInput
              miw={200}
              placeholder={'Type the proof ID'}
              size="md"
              radius={"lg"}
              value={proofId}
              onChange={e => setProofId(e.target.value)}
              flex={1}
            />
            <Button
              leftSection={<IconSearch />}
              radius={"lg"}
              size="md"
              variant="light"
              onClick={() => submit()}
            >
              Verify
            </Button>
          </Group>
        </Card>
          {
            isOwner && proof &&
            <Center>
              <Stack w={300} align="center">
                <ProofCard proof={proof} />
                <Text fw={700} c={"teal"}>Verifiyed</Text>
              </Stack>
            </Center>
          }
      </Stack>
    </AppShell>
  )
}

export default Verify;