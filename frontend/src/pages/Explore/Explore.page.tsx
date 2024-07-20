import { AppShell } from "@/components/Layout";
import { MainTitle } from "@/components/UI/MainTitle";
import ProofSearch from "@/features/Proofs/ProofSearch/ProofSearch";
import ProofsList from "@/features/Proofs/ProofsList/ProofList";
import useProofs from "@/hooks/useProofs";
import { Proof } from "@/types";
import { Center, Loader, Stack } from "@mantine/core";
import { FC, useState } from "react";

const Explore: FC = () => {
  const [searchValue, setSearchValue] = useState<string>('');
  const { proofs, isLoading } = useProofs();

  let filteredProofs: Proof[] = [];

  if (proofs) {
    filteredProofs = proofs.filter(proof => {
      return proof.name.toLowerCase().includes(searchValue.toLocaleLowerCase())
        || proof.description.toLowerCase().includes(searchValue.toLowerCase());
    });
  }

  return (
    <AppShell>
      <Stack gap={"xl"}>
        <MainTitle title="Explore" subtitle="Explore ideas created by the communitiy" />
        <ProofSearch
          searchValue={searchValue}
          setSearchValue={setSearchValue}
          submit={() => alert('searching')}

        />
        {
          isLoading
            ? <Center><Loader /></Center>
            : <ProofsList proofs={filteredProofs} />
        }
      </Stack>
    </AppShell>
  )
}

export default Explore;
