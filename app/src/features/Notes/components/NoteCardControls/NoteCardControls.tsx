import { Note } from "@/types";
import { Group } from "@mantine/core";
import { FC } from "react";
import DeleteButton from "./DeleteButton/DeleteButton";
import PublishButton from "./PublishButton/PublishButton";
import { useWeb3ModalAccount } from "@web3modal/ethers/react";
import { useUserbase } from "@/contexts";

interface NoteCardControlsProps {
  note: Note,
  expanded: boolean,
  newTitle: string,
  newDescription: string,
}

const NoteCardControls: FC<NoteCardControlsProps> = ({
  note,
  expanded,
  newTitle,
  newDescription
}: NoteCardControlsProps) => {
  const { isConnected } = useWeb3ModalAccount();
  const { deleteNote } = useUserbase();

  return (
    <Group justify="space-between">
      <Group>
        {isConnected && <PublishButton note={note} />}
      </Group>
      <DeleteButton note={note} />
    </Group>
  )
}

export default NoteCardControls;