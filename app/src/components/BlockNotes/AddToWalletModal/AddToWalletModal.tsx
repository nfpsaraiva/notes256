import { BlockNote } from "@/types";
import { FC } from "react";
import envs from "@/envs";
import { ActionIcon, CopyButton, Group, Image, Modal, Stack, Text, Tooltip } from "@mantine/core";
import { IconCheck, IconCopy } from "@tabler/icons-react";

interface AddToWalletModalProps {
  note: BlockNote,
  opened: boolean,
  close: () => void
}

const AddToWalletModal: FC<AddToWalletModalProps> = ({
  note,
  opened,
  close
}: AddToWalletModalProps) => {
  const { CONTRACT_ADDRESS } = envs;

  return (
    <Modal opened={opened} onClose={close} withCloseButton={false} padding={0}>
      <Stack gap={"xs"}>
        <Image src={"https://ipfs.filebase.io/ipfs/QmTcWnGBeYX1GRCybjvgGFq3vg74VrstWyeFDnPF3KBvLB"} />
        <Stack p={"md"}>
          <Stack gap={4}>
            <Text fw={600}>Contract address</Text>
            <Group>
              <Text size="xs">{CONTRACT_ADDRESS}</Text>
              <CopyButton value={CONTRACT_ADDRESS} timeout={2000}>
                {({ copied, copy }) => (
                  <Tooltip label={copied ? 'Copied' : 'Copy'} withArrow position="right">
                    <ActionIcon color={copied ? 'teal' : 'gray'} variant="subtle" onClick={copy}>
                      {copied ? (
                        <IconCheck size={16} />
                      ) : (
                        <IconCopy size={16} />
                      )}
                    </ActionIcon>
                  </Tooltip>
                )}
              </CopyButton>
            </Group>
          </Stack>
          <Stack gap={4}>
            <Text fw={600}>Token ID</Text>
            <Group>
              <Text size="xs">{note.tokenId}</Text>
              <CopyButton value={note.tokenId.toString()} timeout={2000}>
                {({ copied, copy }) => (
                  <Tooltip label={copied ? 'Copied' : 'Copy'} withArrow position="right">
                    <ActionIcon color={copied ? 'teal' : 'gray'} variant="subtle" onClick={copy}>
                      {copied ? (
                        <IconCheck size={16} />
                      ) : (
                        <IconCopy size={16} />
                      )}
                    </ActionIcon>
                  </Tooltip>
                )}
              </CopyButton>
            </Group>
          </Stack>
        </Stack>
      </Stack>
    </Modal>
  )
}

export default AddToWalletModal;