import { Button } from "@mantine/core";
import { useOs } from "@mantine/hooks";
import { IconDeviceMobile } from "@tabler/icons-react";
import { FC } from "react";

const UserMenu: FC = () => {
  const os = useOs();

  return (
    <Button
      size="md"
      fw={700} variant="transparent"
      leftSection={
        <IconDeviceMobile size={16} stroke={3} />
      }
    >
      {os === "undetermined" ? "Local device" : os}
    </Button>
  )
}

export default UserMenu;