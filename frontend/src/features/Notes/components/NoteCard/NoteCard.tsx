import { Card } from "@mantine/core";
import { FC, useState } from "react";
import classes from "./NoteCard.module.css";
import { Note } from "@/types";
import { useDisclosure, useLocalStorage } from "@mantine/hooks";
import NoteContent from "../NoteContent/NoteContent";
import NoteCardControls from "../NoteCardControls/NoteCardControls";
import NoteCardExpanded from "../NoteCardExpanded/NoteCardExpanded";
import { useUpdateNote } from "../../hooks";

interface NoteCardProps {
  note: Note
}

const NoteCard: FC<NoteCardProps> = ({ note }: NoteCardProps) => {
  const [opened, { open, close }] = useDisclosure(false);
  const [newTitle, setNewTitle] = useState(note.name);
  const [newDescription, setNewDescription] = useState(note.description);
  const { updateNote } = useUpdateNote(note);

  const [notes, setNotes] = useLocalStorage<Note[]>({
    key: "provify-notes",
    defaultValue: []
  });

  const closeExpanded = () => {
    updateNote(newTitle, newDescription);

    close();
  }

  return (
    <>
      <Card onClick={open} className={classes.NoteCard} radius={"lg"} h={280} padding={"lg"} withBorder shadow="md">
        <NoteContent
          note={note}
          expanded={false}
          newTitle={newTitle}
          newDescription={newDescription}
          setNewTitle={setNewTitle}
          setNewDescription={setNewDescription}
        />
        <Card.Section withBorder bg={"var(--mantine-primary-color-light)"} py={4} inheritPadding>
          <NoteCardControls
            note={note}
            expanded={false}
            newTitle={newTitle}
            newDescription={newDescription}
          />
        </Card.Section>
      </Card>
      <NoteCardExpanded
        opened={opened}
        close={closeExpanded}
        note={note}
        newTitle={newTitle}
        newDescription={newDescription}
        setNewTitle={setNewTitle}
        setNewDescription={setNewDescription}
      />
    </>
  )
}

export default NoteCard;