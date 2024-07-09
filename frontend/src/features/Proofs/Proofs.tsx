import { useProofs } from "@/hooks";
import { Center, Loader, SimpleGrid, Stack, Text, TextInput, Title } from "@mantine/core";
import { FC, useState } from "react";
import { useWeb3ModalAccount } from "@web3modal/ethers/react";
import WalletButton from "../Wallet/WalletButton";
import ProofCard from "./ProofCard";

const Proofs: FC = () => {
  const { address, isConnected } = useWeb3ModalAccount();
  const { proofs, isLoading } = useProofs(address);
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
      </Center>
    )
  }

  const filteredProofs = proofs.filter(proof => {
    return proof.name.toLowerCase().includes(searchValue.toLocaleLowerCase())
      || proof.description.toLowerCase().includes(searchValue.toLowerCase());
  });

  return (
    <Stack gap={"xl"}>
      <TextInput
        placeholder="Search"
        size="md"
        radius={"md"}
        value={searchValue}
        onChange={e => setSearchValue(e.target.value)}
      />
      <SimpleGrid cols={{ base: 1, xs: 2, lg: 3 }}>
        {
          filteredProofs.map(proof => <ProofCard key={proof.id} proof={proof} />)
        }
      </SimpleGrid>
    </Stack>
  )
}

export default Proofs;