import { SimpleGrid } from "@mantine/core";
import { FC } from "react";
import { Draft, Proof } from "@/types";
import { ProofCard } from "@/components/Proof";
import DraftCard from "../DraftCard/DraftCard";

interface DraftListProps {
  drafts: Draft[]
}

const DraftList: FC<DraftListProps> = ({ drafts }: DraftListProps) => {
  return (
    <SimpleGrid cols={{ base: 1, md: 2, xl: 3 }}>
      {
        drafts.map(draft => <DraftCard key={draft.id} draft={draft} />)
      }
    </SimpleGrid>
  )
}

export default DraftList;