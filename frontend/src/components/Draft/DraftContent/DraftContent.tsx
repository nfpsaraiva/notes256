import { Draft } from "@/types";
import { Stack, Text, Textarea, TextInput, Title } from "@mantine/core";
import { FC } from "react";

interface DraftContentProps {
  draft: Draft,
  expanded: boolean,
  newTitle: string,
  newDescription: string,
  setNewTitle: React.Dispatch<React.SetStateAction<string>>,
  setNewDescription: React.Dispatch<React.SetStateAction<string>>
}

const DraftContent: FC<DraftContentProps> = ({
  draft,
  expanded = false,
  newTitle,
  newDescription,
  setNewTitle,
  setNewDescription
}: DraftContentProps) => {
  return (
    <Stack gap={"lg"} h={"100%"} mb={"lg"}>
      <Stack gap={4}>
        {
          expanded
            ? (
              <Stack gap={4}>
                <TextInput
                  value={newTitle}
                  onChange={e => setNewTitle(e.target.value)}
                  variant="unstyled"
                  fw={600}
                />
                {
                  draft.date &&
                  <Text c={"dimmed"} size="xs" fw={500}>
                    {new Date(draft.date).toLocaleDateString()} {new Date(draft.date).toLocaleTimeString()}
                  </Text>
                }
              </Stack>
            )
            : (
              <Stack gap={4}>
                <Title order={3} fw={600} size={"h5"} lineClamp={expanded ? 3 : 2}>{draft.name}</Title>
                {
                  draft.date &&
                  <Text c={"dimmed"} size="xs" fw={500}>
                    {new Date(draft.date).toLocaleDateString()} {new Date(draft.date).toLocaleTimeString()}
                  </Text>
                }
              </Stack>
            )
        }
      </Stack>
      {
        expanded
          ? <Textarea
            value={newDescription}
            onChange={e => setNewDescription(e.target.value)}
            rows={5}
            minRows={5}
            autosize
            variant="unstyled"
            fw={300}
            size="xs"
            lh={1.6}
            maxLength={500}
          />
          : <Text fw={400} lineClamp={5} size="xs" lh={1.6}>
            {draft.description}
          </Text>
      }
    </Stack>
  )
}

export default DraftContent;