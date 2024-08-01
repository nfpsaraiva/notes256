import { useEffect, useState } from "react";
import useBlockNotes from "./useBlockNotes";
import useLocalNotes from "./useLocalNotes";
import useWebNotes from "./useWebNotes";
import { Note } from "@/types";

const useNotes = () => {
  const { localNotes } = useLocalNotes();
  const { webNotes } = useWebNotes();
  const { blockNotes } = useBlockNotes();
  const [notes, setNotes] = useState<Note[]>([]);

  useEffect(() => {
    if (
      webNotes !== null &&
      blockNotes !== undefined
    ) {
      setNotes([
        ...localNotes,
        ...webNotes,
        ...blockNotes
      ])
    }
  }, [localNotes, webNotes, blockNotes]);

  return { notes };
}

export default useNotes;