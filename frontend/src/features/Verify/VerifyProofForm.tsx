import { Center, Loader, NumberInput, Stack, Text, TextInput, Title } from "@mantine/core";
import { FC, useState } from "react";
import { useProof, useVerifyProof } from "@/hooks";

const VerifyProofForm: FC = () => {
  const [proofId, setProofId] = useState<string>('');
  const { proof } = useProof(proofId);
  const { address, isSuccess, isFetching } = useVerifyProof(proofId);

  return (
    <Stack>
      <TextInput
        placeholder="Proof ID"
        value={proofId}
        size="md"
        radius={"md"}
        onChange={e => setProofId(e.target.value)}
      />

      {
        isFetching
          ? <Center><Loader /></Center>
          : (
            isSuccess && (
              address !== null
                ? <Center><Text c={"teal"} fw={700}>Owner: {address}</Text></Center>
                : <Center><Text c={"red"} fw={700}>Does not exist yet</Text></Center>
            )
          )
      }
    </Stack>
  )
}

export default VerifyProofForm;