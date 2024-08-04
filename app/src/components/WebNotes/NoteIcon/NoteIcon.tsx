import { IconCloud, IconCube, IconDeviceMobile } from "@tabler/icons-react";
import { FC } from "react";

interface NoteIconProps {
  size?: number,
  stroke?: number
}

const NoteIcon: FC<NoteIconProps> = ({
  size = 20,
  stroke = 2
}: NoteIconProps) => {
  return (
    <IconCloud size={size} stroke={stroke} />
  )
}

export default NoteIcon;