import { FC, useState } from "react";
import ProofsList from "../ProofsList/ProofList";
import { Center, filterProps, Loader, Stack, Text, Title } from "@mantine/core";
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

  if (!isConnected) {
    return (
      <Center h={"70vh"}>
        <Stack>
          <Stack gap={3} align='center'>
            <Title ta={"center"} fw={600} order={2}>
              Get your intellectual property
            </Title>
            <Text ta={"center"} c={"dimmed"}>
              <strong>Write</strong> statements and original ideas to the <strong>Blockchain</strong>
            </Text>
          </Stack>
          <WalletButton />
        </Stack>
      </Center>
    )
  }

  let filteredProofs: Proof[] = [];

  if (proofs) {
    filteredProofs = proofs.filter(proof => {
      return proof.name.toLowerCase().includes(searchValue.toLocaleLowerCase())
        || proof.description.toLowerCase().includes(searchValue.toLowerCase());
    });
  }

  return (
    <Stack gap={"xl"}>
      <ProofSearch searchValue={searchValue} setSearchValue={setSearchValue} />

      {
        isLoading
          ? <Center><Loader /></Center>
          : <ProofsList proofs={filteredProofs} />
      }

      <CreateProofButton />
    </Stack>
  )
}

export default ProofsPanel;