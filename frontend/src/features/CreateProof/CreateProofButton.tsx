import { ActionIcon, Affix, Tooltip } from "@mantine/core";
import { FC } from "react";
import CreateProofModal from "./CreateProofModal";
import { useDisclosure } from "@mantine/hooks";
import { IconPlus } from "@tabler/icons-react";

const CreateProofButton: FC = () => {
  const [opened, { open, close }] = useDisclosure(false);

  return (
    <>
      <Affix position={{ bottom: 20, right: 20 }}>
        <ActionIcon onClick={open} radius={"xl"} size={"xl"}>
          <IconPlus stroke={3} />
        </ActionIcon>
      </Affix>
      <CreateProofModal opened={opened} close={close} />
    </>
  )
}

export default CreateProofButton;