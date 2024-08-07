import { Card } from "@mantine/core";
import { FC, ReactNode } from "react";
import classes from "./NoteCard.module.css";
import { Note } from "@/types";
import { useDisclosure } from "@mantine/hooks";
import NoteContent from "../NoteContent/NoteContent";
import NoteCardExpanded from "../NoteCardExpanded/NoteCardExpanded";

interface NoteCardProps {
  note: Note,
  updateNote: (note: Note) => void,
  noteMenuIcon: ReactNode
}

const NoteCard: FC<NoteCardProps> = ({
  note,
  updateNote,
  noteMenuIcon
}: NoteCardProps) => {
  const [opened, { open, close }] = useDisclosure(false);

  return (
    <>
      <Card onClick={open} className={classes.NoteCard} radius={"xl"} h={280} padding={"lg"} withBorder shadow="md">
        <NoteContent
          note={note}
          expanded={false}
          noteMenuIcon={noteMenuIcon}
        />
      </Card>
      <NoteCardExpanded
        opened={opened}
        close={close}
        note={note}
        updateNote={updateNote}
        noteMenuIcon={noteMenuIcon}
      />
    </>
  )
}

export default NoteCard;