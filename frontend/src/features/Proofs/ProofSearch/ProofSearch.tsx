import { Button, Card, Group, TextInput } from "@mantine/core";
import { IconSearch } from "@tabler/icons-react";
import { FC, ReactNode } from "react";

interface ProofSearchProps {
  searchValue: string,
  setSearchValue: any,
  placeholder?: string,
  submitLabel?: string,
  submitIcon?: ReactNode
  submit?: any
}

const ProofSearch: FC<ProofSearchProps> = ({
  searchValue,
  setSearchValue,
  placeholder = "Search",
  submitLabel = "Search",
  submitIcon = <IconSearch size={18} />,
  submit
}: ProofSearchProps) => {
  return (
    <Card radius={"xl"} shadow="xs">
      <Group>
        <TextInput
          miw={200}
          placeholder={placeholder}
          size="md"
          radius={"lg"}
          value={searchValue}
          onChange={e => setSearchValue(e.target.value)}
          flex={1}
        />
        {
          submit &&
          <Button
            leftSection={submitIcon}
            radius={"lg"}
            size="md"
            variant="light"
            onClick={submit}
          >
            {submitLabel}
          </Button>
        }
      </Group>
    </Card>
  )
}

export default ProofSearch;