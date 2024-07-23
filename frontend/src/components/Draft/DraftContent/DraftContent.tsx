import { Draft } from "@/types";
import { Stack, Text, Textarea, TextInput, Title } from "@mantine/core";
import { FC, useState } from "react";
import { useLocalStorage } from "@mantine/hooks";

interface DraftContentProps {
  draft: Draft,
  expanded: boolean
}

const DraftContent: FC<DraftContentProps> = ({ draft, expanded = false }: DraftContentProps) => {
  const [newTitle, setNewTitle] = useState(draft.name);
  const [newDescription, setNewDescription] = useState(draft.description);

  const [drafts, setDrafts] = useLocalStorage<Draft[]>({
    key: "provify-drafts",
    defaultValue: []
  });

  const saveTitle = (draft: Draft, title: string) => {
    const newDrafts = drafts.filter(d => d.id !== draft.id);

    const newDraft: Draft = {
      id: `provify-draft-${Date.now()}`,
      name: title,
      description: draft.description,
    }

    newDrafts.push(newDraft);

    setDrafts(newDrafts);
  }

  return (
    <Stack gap={"lg"} h={"100%"} mb={"lg"}>
      <Stack gap={4}>
        {
          expanded
            ? <TextInput
              value={newTitle}
              onChange={e => { setNewTitle(e.target.value); saveTitle(draft, e.target.value); }}
            />
            : <Title order={3} fw={600} size={"h5"} lineClamp={expanded ? 3 : 2}>{draft.name}</Title>
        }
      </Stack>
      {
        expanded
          ? <Textarea
            value={newDescription}
            onChange={e => { setNewDescription(e.target.value); }}
            rows={5}
            minRows={5}
            autosize

          />
          : <Text fw={300} lineClamp={5} size="xs" lh={1.6}>
            {draft.description}
          </Text>
      }
    </Stack>
  )
}

export default DraftContent;