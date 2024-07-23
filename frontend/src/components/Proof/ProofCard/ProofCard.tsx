import { Box, Card } from "@mantine/core";
import { FC } from "react";
import classes from "./ProofCard.module.css";
import { Proof } from "@/types";
import { useDisclosure } from "@mantine/hooks";
import ProofCardControls from "../ProofCardControls/ProofCardControls";
import ProofCardExpanded from "../ProofCardExpanded/ProofCardExpanded";
import ProofContent from "../ProofContent/ProofContent";
import TransferModal from "../ProofCardControls/TransferModal/TransferModal";

interface ProofCardProps {
  proof: Proof
}

const ProofCard: FC<ProofCardProps> = ({ proof }: ProofCardProps) => {
  const [opened, { open, close }] = useDisclosure(false);
  const [transferModalOpened, transferModalHandle] = useDisclosure(false);

  return (
    <>
      <Card onClick={open} className={classes.proofCard} radius={"lg"} h={280} padding={"lg"} withBorder shadow="md">
        <ProofContent proof={proof} expanded={false} />
        <Card.Section withBorder bg={"var(--mantine-primary-color-light)"} py={4} inheritPadding>
          <ProofCardControls proof={proof} openTransferModal={transferModalHandle.open} />
        </Card.Section>
      </Card>
      <ProofCardExpanded opened={opened} openTransferModal={transferModalHandle.open} close={close} proof={proof} />
      <TransferModal opened={transferModalOpened} close={transferModalHandle.close} proof={proof} />
    </>
  )
}

export default ProofCard;