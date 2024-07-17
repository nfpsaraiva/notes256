import { ProofCard } from "@/components/Common";
import { useProof } from "@/hooks";
import useStore from "@/stores/store";
import { Center, Loader, Stack, TextInput } from "@mantine/core";
import { FC } from "react";
import { useShallow } from "zustand/react/shallow";

const VerifyPanel: FC = () => {
  const [
    proofId,
    setProofId,
  ] = useStore(useShallow(state => [
    state.proofId,
    state.setProofId
  ]));

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