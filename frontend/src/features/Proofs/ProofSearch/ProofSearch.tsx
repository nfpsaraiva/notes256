import { TextInput } from "@mantine/core";
import { FC } from "react";

interface ProofSearchProps {
  searchValue: string,
  setSearchValue: React.Dispatch<React.SetStateAction<string>>
}

const ProofSearch: FC<ProofSearchProps> = ({
  searchValue,
  setSearchValue
}: ProofSearchProps) => {
  return (
    <TextInput
      placeholder="Search"
      autoFocus
      size="md"
      radius={"md"}
      value={searchValue}
      onChange={e => setSearchValue(e.target.value)}
    />
  )
}

export default ProofSearch;