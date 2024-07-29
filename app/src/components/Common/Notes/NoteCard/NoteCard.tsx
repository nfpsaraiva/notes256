import { Card } from "@mantine/core";
import { FC, ReactNode, useState } from "react";
import classes from "./NoteCard.module.css";
import { Note } from "@/types";
import { useDisclosure } from "@mantine/hooks";
import NoteContent from "../NoteContent/NoteContent";
import NoteCardExpanded from "../NoteCardExpanded/NoteCardExpanded";

interface NoteCardProps {
  note: Note,
  updateNote: (note: Note) => Promise<void>,
  noteMenuIcon: ReactNode
}

const NoteCard: FC<NoteCardProps> = ({
  note,
  updateNote,
  noteMenuIcon
}: NoteCardProps) => {
  const [opened, { open, close }] = useDisclosure(false);
  const [name, setName] = useState(note.name);
  const [description, setDescription] = useState(note.description);

  const closeExpanded = () => {
    updateNote({
      ...note,
      name,
      description
    });
    close();
  }

  return (
    <>
      <Card onClick={open} className={classes.NoteCard} radius={"lg"} h={280} padding={"lg"} withBorder shadow="md">
        <NoteContent
          note={note}
          expanded={false}
          noteMenuIcon={noteMenuIcon}
        />
      </Card>
      <NoteCardExpanded
        opened={opened}
        close={closeExpanded}
        note={note}
        newTitle={name}
        newDescription={description}
        setNewTitle={setName}
        setNewDescription={setDescription}
        noteMenuIcon={noteMenuIcon}
      />
    </>
  )
}

export default NoteCard;