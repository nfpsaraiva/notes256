import { Nft } from "@/types";
import { ScrollArea, Stack, Text, Title } from "@mantine/core";
import { FC } from "react";

interface NftContentProps {
  nft: Nft,
  expanded: boolean
}

const NftContent: FC<NftContentProps> = ({ nft, expanded = false }: NftContentProps) => {
  return (
    <Stack gap={"lg"} h={"100%"} mb={"lg"}>
      <Stack gap={4}>
        {
          nft.name !== "" &&
        <Title order={3} fw={600} size={"h5"} lineClamp={expanded ? 3 : 2}>{nft.name}</Title>
        }
        {
          nft.date &&
          <Text c={"dimmed"} size="xs" fw={500}>
            {nft.date.toLocaleDateString()} {nft.date.toLocaleTimeString()}
          </Text>
        }
      </Stack>
      {
        expanded
          ? <ScrollArea h={300}>
            <Text fw={300} size="sm" lh={1.6}>
              {nft.description}
            </Text>
          </ScrollArea>
          : <Text fw={400} lineClamp={5} size="sm" lh={1.6}>
            {nft.description}
          </Text>
      }
    </Stack>
  )
}

export default NftContent;