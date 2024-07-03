import { Center, Loader, NumberInput, Stack, Text, TextInput } from "@mantine/core";
import { FC, useState } from "react";
import { useVerifyProof } from "@/hooks";

const VerifyProofForm: FC = () => {
  const [proofId, setProofId] = useState<number>(0);
  const [address, setAddress] = useState<string>("");
  const { verified, isSuccess, isFetching } = useVerifyProof(Number(proofId), address);

  return (
    <Stack>
      <TextInput
        withAsterisk
        label="Owner Address"
        placeholder="Type the owner address"
        value={address}
        onChange={e => setAddress(e.target.value)}
      />
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