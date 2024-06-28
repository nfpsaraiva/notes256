import { Center, Loader, NumberInput, Stack, Text } from "@mantine/core";
import { FC, useState } from "react";
import { useVerifyProof } from "@/hooks";

const VerifyProofForm: FC = () => {
  const [proofId, setProofId] = useState<number>();
  const { verified, isSuccess, isFetching } = useVerifyProof(Number(proofId));

  return (
    <Stack>
      <NumberInput
        withAsterisk
        label="Proof ID"
        placeholder="Enter the proof ID"
        value={proofId}
        onChange={e => setProofId(Number(e))}
      />

      {
        isFetching
          ? <Center><Loader /></Center>
          : (
            isSuccess && (
              verified
                ? <Center><Text c={"teal"} fw={700}>Verified</Text></Center>
                : <Center><Text c={"red"} fw={700}>Not Verified</Text></Center>
            )
          )
      }
    </Stack>
  )
}

export default VerifyProofForm;