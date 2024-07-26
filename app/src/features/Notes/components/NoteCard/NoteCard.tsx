import { Card } from "@mantine/core";
import { FC, useState } from "react";
import classes from "./NoteCard.module.css";
import { Note } from "@/types";
import { useDisclosure } from "@mantine/hooks";
import NoteContent from "../NoteContent/NoteContent";
import NoteCardControls from "../NoteCardControls/NoteCardControls";
import NoteCardExpanded from "../NoteCardExpanded/NoteCardExpanded";
import { useUserbase } from "@/contexts";

interface NoteCardProps {
  note: Note
}

const NoteCard: FC<NoteCardProps> = ({ note }: NoteCardProps) => {
  const [opened, { open, close }] = useDisclosure(false);
  const [name, setName] = useState(note.name);
  const [description, setDescription] = useState(note.description);
  const { updateNote } = useUserbase();

  const closeExpanded = () => {
    updateNote({
      ...note,
      name,
      description,
      date: new Date()
    });

    close();
  }

  return (
    <>
      <Card onClick={open} className={classes.NoteCard} radius={"lg"} h={280} padding={"lg"} withBorder shadow="md">
        <NoteContent
          note={note}
          expanded={false}
          newTitle={name}
          newDescription={description}
          setNewTitle={setName}
          setNewDescription={setDescription}
        />
        <Card.Section withBorder bg={"var(--mantine-primary-color-light)"} py={4} inheritPadding>
          <NoteCardControls
            note={note}
            expanded={false}
            newTitle={name}
            newDescription={description}
          />
        </Card.Section>
      </Card>
      <NoteCardExpanded
        opened={opened}
        close={closeExpanded}
        note={note}
        newTitle={name}
        newDescription={description}
        setNewTitle={setName}
        setNewDescription={setDescription}
      />
    </>
  )
}

export default NoteCard;