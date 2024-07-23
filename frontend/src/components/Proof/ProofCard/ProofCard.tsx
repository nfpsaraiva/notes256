import { Card } from "@mantine/core";
import { FC } from "react";
import classes from "./ProofCard.module.css";
import { Proof } from "@/types";
import { useDisclosure } from "@mantine/hooks";
import ProofCardControls from "../ProofCardControls/ProofCardControls";
import ProofCardExpanded from "../ProofCardExpanded/ProofCardExpanded";
import ProofContent from "../ProofContent/ProofContent";

interface ProofCardProps {
  proof: Proof
}

const ProofCard: FC<ProofCardProps> = ({ proof }: ProofCardProps) => {
  const [opened, { open, close }] = useDisclosure(false);

  return (
    <>
      <Card onClick={open} className={classes.proofCard} radius={"lg"} h={280} padding={"lg"} withBorder shadow="md">
        <ProofContent proof={proof} expanded={false} />
        <Card.Section withBorder bg={"var(--mantine-primary-color-light)"} py={4} inheritPadding>
          <ProofCardControls proof={proof} />
        </Card.Section>
      </Card>
      <ProofCardExpanded opened={opened} close={close} proof={proof} />
    </>
  )
}

export default ProofCard;