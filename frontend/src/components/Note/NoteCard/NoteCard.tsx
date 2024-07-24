import { Box, Card } from "@mantine/core";
import { FC } from "react";
import classes from "./NoteCard.module.css";
import { useDisclosure } from "@mantine/hooks";
import TransferModal from "../NoteCardControls/TransferModal/TransferModal";
import NoteContent from "../NoteContent/NoteContent";
import NoteCardControls from "../NoteCardControls/NoteCardControls";
import NoteCardExpanded from "../NoteCardExpanded/NoteCardExpanded";
import { Note } from "@/types";

interface NoteCardProps {
  note: Note
}

const NoteCard: FC<NoteCardProps> = ({ note }: NoteCardProps) => {
  const [opened, { open, close }] = useDisclosure(false);
  const [transferModalOpened, transferModalHandle] = useDisclosure(false);

  return (
    <>
      <Card onClick={open} className={classes.noteCard} radius={"lg"} h={280} padding={"lg"} withBorder shadow="md">
        <NoteContent note={note} expanded={false} />
        <Card.Section withBorder bg={"var(--mantine-primary-color-light)"} py={4} inheritPadding>
          <NoteCardControls note={note} openTransferModal={transferModalHandle.open} />
        </Card.Section>
      </Card>
      <NoteCardExpanded opened={opened} openTransferModal={transferModalHandle.open} close={close} note={note} />
      <TransferModal opened={transferModalOpened} close={transferModalHandle.close} note={note} />
    </>
  )
}

export default NoteCard;