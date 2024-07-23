import { SimpleGrid } from "@mantine/core";
import { FC } from "react";
import { Proof } from "@/types";
import { ProofCard } from "@/components/Proof";

interface ProofsListProps {
  proofs: Proof[]
}

const ProofsList: FC<ProofsListProps> = ({ proofs }: ProofsListProps) => {
  return (
    <SimpleGrid cols={{ base: 1, xs: 2, lg: 3 }}>
      {
        proofs.map(proof => <ProofCard key={proof.id} proof={proof} />)
      }
    </SimpleGrid>
  )
}

export default ProofsList;