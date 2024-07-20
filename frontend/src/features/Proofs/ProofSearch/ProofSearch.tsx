import { Button, Card, Group, TextInput } from "@mantine/core";
import { IconSearch } from "@tabler/icons-react";
import { FC } from "react";

interface ProofSearchProps {
  searchValue: string,
  setSearchValue: any
}

const ProofSearch: FC<ProofSearchProps> = ({
  searchValue,
  setSearchValue
}: ProofSearchProps) => {
  return (
    <Card radius={"xl"} shadow="xs">
      <Group>
        <TextInput
          miw={200}
          placeholder="Search"
          autoFocus
          size="md"
          radius={"lg"}
          value={searchValue}
          onChange={e => setSearchValue(e.target.value)}
          flex={1}
        />
        <Button
          leftSection={<IconSearch size={18} />}
          radius={"lg"}
          size="md"
          variant="light"
        >
          Search
        </Button>
      </Group>
    </Card>
  )
}

export default ProofSearch;