import { Card } from "@mantine/core";
import { FC, useState } from "react";
import classes from "./DraftCard.module.css";
import { Draft } from "@/types";
import { useDisclosure, useLocalStorage } from "@mantine/hooks";
import DraftContent from "../DraftContent/DraftContent";
import DraftCardControls from "../DraftCardControls/DraftCardControls";
import DraftCardExpanded from "../DraftCardExpanded/DraftCardExpanded";

interface DraftCardProps {
  draft: Draft
}

const DraftCard: FC<DraftCardProps> = ({ draft }: DraftCardProps) => {
  const [opened, { open, close }] = useDisclosure(false);
  const [newTitle, setNewTitle] = useState(draft.name);
  const [newDescription, setNewDescription] = useState(draft.description);

  const [drafts, setDrafts] = useLocalStorage<Draft[]>({
    key: "provify-drafts",
    defaultValue: []
  });

  const closeExpanded = () => {
    const newDrafts = drafts.filter(d => d.id !== draft.id);

    const newDraft: Draft = {
      id: `provify-draft-${Date.now()}`,
      name: newTitle,
      description: newDescription,
      date: new Date()
    }

    setDrafts([...newDrafts, newDraft]);

    close();
  }

  return (
    <>
      <Card onClick={open} className={classes.DraftCard} radius={"lg"} h={280} padding={"lg"} withBorder shadow="md">
        <DraftContent
          draft={draft}
          expanded={false}
          newTitle={newTitle}
          newDescription={newDescription}
          setNewTitle={setNewTitle}
          setNewDescription={setNewDescription}
        />
        <Card.Section withBorder bg={"var(--mantine-primary-color-light)"} py={4} inheritPadding>
          <DraftCardControls
            draft={draft}
            expanded={false}
            newTitle={newTitle}
            newDescription={newDescription}
          />
        </Card.Section>
      </Card>
      <DraftCardExpanded
        opened={opened}
        close={closeExpanded}
        draft={draft}
        newTitle={newTitle}
        newDescription={newDescription}
        setNewTitle={setNewTitle}
        setNewDescription={setNewDescription}
      />
    </>
  )
}

export default DraftCard;