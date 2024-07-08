import { ActionIcon, Affix } from "@mantine/core";
import { FC } from "react";
import { useDisclosure } from "@mantine/hooks";
import { IconSearch } from "@tabler/icons-react";

const SearchProofButton: FC = () => {
  const [opened, { open, close }] = useDisclosure(false);

  return (
    <>
      <Affix position={{ bottom: 80, right: 20 }}>
        <ActionIcon variant="light" onClick={open} radius={"xl"} size={"xl"}>
          <IconSearch stroke={3} />
        </ActionIcon>
      </Affix>
    </>
  )
}

export default SearchProofButton;