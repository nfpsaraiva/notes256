import { Center, Loader, NumberInput, Stack, Text, TextInput } from "@mantine/core";
import { FC, useState } from "react";
import { useVerifyProof } from "@/hooks";

const VerifyProofForm: FC = () => {
  const [proofId, setProofId] = useState<string>('');
  const { address, isSuccess, isFetching } = useVerifyProof(proofId);


  return (
    <Stack>
      <TextInput
        withAsterisk
        label="Proof ID"
        placeholder="Enter the proof ID"
        value={proofId}
        onChange={e => setProofId(e.target.value)}
      />

      {
        isFetching
          ? <Center><Loader /></Center>
          : (
            isSuccess && (
              address !== null
                ? <Center><Text c={"teal"} fw={700}>Belongs to: {address}</Text></Center>
                : <Center><Text c={"red"} fw={700}>Does not exist yet</Text></Center>
            )
          )
      }
    </Stack>
  )
}

export default VerifyProofForm;