import { ActionIcon, Button, Card, Group, Menu, TextInput } from "@mantine/core";
import { IconDots, IconRefresh, IconSearch } from "@tabler/icons-react";
import { FC, ReactNode } from "react";

interface NftSearchProps {
  searchValue: string,
  setSearchValue: any,
  placeholder?: string,
  submitLabel?: string,
  submitIcon?: ReactNode
  submit?: any
}

const NftSearch: FC<NftSearchProps> = ({
  searchValue,
  setSearchValue,
  placeholder = "Search",
  submitLabel = "Search",
  submitIcon = <IconSearch size={18} />,
  submit
}: NftSearchProps) => {
  return (
    <Card radius={"xl"} shadow="xs">
      <Group wrap="nowrap">
        <TextInput
          placeholder={placeholder}
          size="md"
          radius={"lg"}
          value={searchValue}
          onChange={e => setSearchValue(e.target.value)}
          flex={1}
        />
        {
          submit && (
            <Group wrap="nowrap">
              <Menu>
                <Menu.Target>
                  <ActionIcon radius={"xl"} variant="light" size={"lg"}>
                    <IconDots size={16} />
                  </ActionIcon>
                </Menu.Target>
              </Menu>
              <Button
                leftSection={submitIcon}
                radius={"lg"}
                size="md"
                variant="light"
                onClick={submit}
                visibleFrom="sm"
              >
                {submitLabel}
              </Button>
              <ActionIcon hiddenFrom="sm" radius={"xl"} variant="light" size={"lg"}>
                <IconRefresh size={16} />
              </ActionIcon>
            </Group>
          )
        }
      </Group>
    </Card>
  )
}

export default NftSearch;