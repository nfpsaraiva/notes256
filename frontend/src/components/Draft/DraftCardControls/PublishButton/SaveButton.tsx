import { ActionIcon, Tooltip } from "@mantine/core";
import { IconCheck } from "@tabler/icons-react";
import { FC } from "react";

const SaveButton: FC = () => {
  return (
    <Tooltip label="Save">
      <ActionIcon variant="subtle" size={"lg"}>
        <IconCheck size={16} />
      </ActionIcon>
    </Tooltip>
  )
}

export default SaveButton;