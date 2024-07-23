import { ActionIcon, Tooltip } from "@mantine/core";
import { IconCertificate } from "@tabler/icons-react";
import { FC } from "react";

const PublishButton: FC = () => {
  return (
    <Tooltip label="Publish">
      <ActionIcon variant="subtle" size={"lg"}>
        <IconCertificate size={16} />
      </ActionIcon>
    </Tooltip>
  )
}

export default PublishButton;