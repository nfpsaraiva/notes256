import { ActionIcon } from "@mantine/core";
import { IconLayoutSidebar } from "@tabler/icons-react";
import { FC } from "react";

interface SidebarToggleProps {
  toggle: () => void
}

const SidebarToggle: FC<SidebarToggleProps> = ({ toggle }: SidebarToggleProps) => {
  return (
    <ActionIcon onClick={toggle} variant='subtle' size={"lg"} color="--mantine-color-text">
      <IconLayoutSidebar size={24} />
    </ActionIcon>
  )
}

export default SidebarToggle;