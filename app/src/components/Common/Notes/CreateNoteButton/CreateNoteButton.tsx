import { ActionIcon, Affix, Tooltip } from "@mantine/core";
import { FC } from "react";
import { IconPlus } from "@tabler/icons-react";

interface CreateNoteButtonProps {
  open: () => void
}

const CreateNoteButton: FC<CreateNoteButtonProps> = ({ open }: CreateNoteButtonProps) => {
  return (
    <>
      <Affix bottom={20} right={20}>
        <Tooltip label="New LocalNote">
          <ActionIcon
            onClick={open}
            size={50}
            radius={"xl"}

          >
            <IconPlus size={26} stroke={3} />
          </ActionIcon>
        </Tooltip>
      </Affix>
    </>
  )
}

export default CreateNoteButton;