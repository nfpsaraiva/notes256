import { Card } from "@mantine/core";
import { FC, useState } from "react";
import classes from "./NoteCard.module.css";
import { Note } from "@/types";
import { useDisclosure } from "@mantine/hooks";
import NoteContent from "../NoteContent/NoteContent";
import NoteCardControls from "../NoteCardControls/NoteCardControls";
import NoteCardExpanded from "../NoteCardExpanded/NoteCardExpanded";

interface NoteCardProps {
  note: Note,
  updateNote: (note: Note) => Promise<void>,
  deleteNote: (note: Note) => Promise<void>,
}

const NoteCard: FC<NoteCardProps> = ({ note, updateNote, deleteNote }: NoteCardProps) => {
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
      <Card onClick={open} className={classes.LocalNoteCard} radius={"lg"} h={280} padding={"lg"} withBorder shadow="md">
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
            deleteNote={deleteNote}
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
        deleteNote={deleteNote}
      />
    </>
  )
}

export default NoteCard;