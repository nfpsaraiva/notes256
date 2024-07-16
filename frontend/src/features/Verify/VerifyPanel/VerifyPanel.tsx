import { ProofCard } from "@/components/Common";
import { useProof } from "@/hooks";
import { Center, Loader, Stack, Text, TextInput } from "@mantine/core";
import { FC, useState } from "react";

const VerifyPanel: FC = () => {
  const [proofId, setProofId] = useState<string>('');
  const { proof, isLoading, isError } = useProof(proofId);

  return (
    <Stack>
      <TextInput
        placeholder="Proof ID"
        value={proofId}
        onChange={e => setProofId(e.target.value)}
        size="md"
        radius={"md"}
      />

      {
        isLoading &&
        <Center>
          <Loader />
        </Center>
      }

      {
        (isError || !proof) && <></>
      }

      {
        proof &&
        <Center>
          <ProofCard proof={proof} />
        </Center>
      }
    </Stack>
  )
}

export default VerifyPanel;