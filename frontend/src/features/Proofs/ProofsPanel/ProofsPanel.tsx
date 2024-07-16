import { FC, useState } from "react";
import ProofsList from "../ProofsList/ProofList";
import { Center, Loader, Stack, Text, Title } from "@mantine/core";
import WalletButton from "@/features/Wallet/WalletButton";
import CreateProofButton from "../CreateProof/CreateProofButton";
import { useOwnerProofs } from "@/hooks";
import { useWeb3ModalAccount } from "@web3modal/ethers/react";
import ProofSearch from "../ProofSearch/ProofSearch";

const ProofsPanel: FC = () => {
  const { address, isConnected } = useWeb3ModalAccount();
  const { proofs, isLoading } = useOwnerProofs(address);
  const [searchValue, setSearchValue] = useState('');


  if (!isConnected) {
    return (
      <Center h={"70vh"}>
        <Stack>
          <Stack gap={3} align='center'>
            <Title ta={"center"} fw={500} order={2}>
              Get your intellectual property
            </Title>
            <Text ta={"center"} c={"dimmed"}>
              <strong>Write</strong> and <strong>Publish</strong> your original ideas to the <strong>Blockchain</strong>
            </Text>
          </Stack>
          <WalletButton />
        </Stack>
      </Center>
    )
  }

  if (isLoading) {
    return (
      <Center>
        <Loader />
      </Center>
    )
  }

  if (!proofs || proofs.length === 0) {
    return (
      <Center h={"70vh"}>
        <Title ta={"center"} fw={500} order={2}>
          No proofs here!
        </Title>
        {
          isConnected && <CreateProofButton />
        }
      </Center>
    )
  }

  const filteredProofs = proofs.filter(proof => {
    return proof.name.toLowerCase().includes(searchValue.toLocaleLowerCase())
      || proof.description.toLowerCase().includes(searchValue.toLowerCase());
  });

  return (
    <Stack gap={"xl"}>
      <ProofSearch searchValue={searchValue} setSearchValue={setSearchValue} />
      <ProofsList proofs={filteredProofs} />
      <CreateProofButton />
    </Stack>
  )
}

export default ProofsPanel;