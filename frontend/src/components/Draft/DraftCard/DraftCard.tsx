import { Card } from "@mantine/core";
import { FC } from "react";
import classes from "./DraftCard.module.css";
import { Draft } from "@/types";
import { useDisclosure } from "@mantine/hooks";
import DraftContent from "../DraftContent/DraftContent";
import DraftCardControls from "../DraftCardControls/DraftCardControls";
import DraftCardExpanded from "../DraftCardExpanded/DraftCardExpanded";

interface DraftCardProps {
  draft: Draft
}

const DraftCard: FC<DraftCardProps> = ({ draft }: DraftCardProps) => {
  const [opened, { open, close }] = useDisclosure(false);

  return (
    <>
      <Card onClick={open} className={classes.DraftCard} radius={"lg"} h={280} padding={"lg"} withBorder shadow="md">
        <DraftContent draft={draft} expanded={false} />
        <Card.Section withBorder bg={"var(--mantine-primary-color-light)"} py={4} inheritPadding>
          <DraftCardControls draft={draft} expanded={false} />
        </Card.Section>
      </Card>
      <DraftCardExpanded opened={opened} close={close} draft={draft} />
    </>
  )
}

export default DraftCard;