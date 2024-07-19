import { FC, useState } from "react";
import ProofsList from "../ProofsList/ProofList";
import { Button, Center, filterProps, Group, Loader, Stack, Text, Title } from "@mantine/core";
import WalletButton from "@/features/Wallet/WalletButton";
import CreateProofButton from "../CreateProof/CreateProofButton";
import { useOwnerProofs } from "@/hooks";
import { useWeb3ModalAccount } from "@web3modal/ethers/react";
import ProofSearch from "../ProofSearch/ProofSearch";
import { Proof } from "@/types";

const ProofsPanel: FC = () => {
  const { address, isConnected } = useWeb3ModalAccount();
  const { proofs, isLoading } = useOwnerProofs(address);
  const [searchValue, setSearchValue] = useState('');


  let filteredProofs: Proof[] = [];

  if (proofs) {
    filteredProofs = proofs.filter(proof => {
      return proof.name.toLowerCase().includes(searchValue.toLocaleLowerCase())
        || proof.description.toLowerCase().includes(searchValue.toLowerCase());
    });
  }

  return (
    <Stack gap={"xl"}>
      <Group justify="space-between" align="center">
        <Stack gap={2}>
          <Title>Proofs</Title>
          <Text c={"dimmed"}>Create original ideas</Text>
        </Stack>
        <CreateProofButton />
      </Group>
      <ProofSearch searchValue={searchValue} setSearchValue={setSearchValue} />

      {
        isLoading
          ? <Center><Loader /></Center>
          : <ProofsList proofs={filteredProofs} />
      }

    </Stack>
  )
}

export default ProofsPanel;