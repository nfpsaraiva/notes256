import { NoteType } from "@/enums";
import { Note } from "@/types";
import { shortifyAddress } from "@/utils/NotesUtils";
import { ActionIcon, CopyButton, Group, Stack, Text, Tooltip } from "@mantine/core";
import { IconCheck, IconCopy } from "@tabler/icons-react";
import { FC } from "react";

interface NoteContentFooterProps {
  note: Note,
  descriptionLength: number,
  descriptionMaxLength: number
}

const NoteContentFooter: FC<NoteContentFooterProps> = ({
  note,
  descriptionLength,
  descriptionMaxLength
}: NoteContentFooterProps) => {
  return (
    <Stack>
      <Group justify="flex-end">
        <Text size="xs" c={"dimmed"} fw={500}>{descriptionLength}/{descriptionMaxLength}</Text>
      </Group>
      <Group justify="space-between" align="start" wrap="nowrap">
        {
          note.date &&
          <Text c={"dimmed"} size="xs" fw={500}>
            {
              new Date(note.date).toLocaleDateString() + " " + new Date(note.date).toLocaleTimeString()
            }
          </Text>
        }
        {
          note.type === NoteType.BLOCK &&
          <Group gap={"xs"}>
            <CopyButton value={note.owner} timeout={2000}>
              {({ copied, copy }) => (
                <Tooltip label={copied ? 'Copied' : 'Copy Address'} withArrow position="right">
                  <ActionIcon color={copied ? 'teal' : 'gray'} variant="transparent" onClick={copy}>
                    {copied ? (
                      <IconCheck size={14} />
                    ) : (
                      <IconCopy color="gray" size={14} />
                    )}
                  </ActionIcon>
                </Tooltip>
              )}
            </CopyButton>
            <Text c={"dimmed"} fw={500} size="xs">{shortifyAddress(note.owner)}</Text>
          </Group>
        }
      </Group>
    </Stack>
  )
}

export default NoteContentFooter;