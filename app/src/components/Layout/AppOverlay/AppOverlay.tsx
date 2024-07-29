import { LoadingOverlay, Text, Stack, Loader, Title, Group, Image } from "@mantine/core";
import { FC } from "react";

interface AppOverlayProps {
  visible: boolean
}

const AppOverlay: FC<AppOverlayProps> = ({ visible }: AppOverlayProps) => {
  return (
    <LoadingOverlay visible={visible} overlayProps={{ backgroundOpacity: 1 }} loaderProps={{
      children: <Stack align='center' gap={"lg"}>
        <Group align='end'>
          <Title order={1}>Notes256</Title>
        </Group>
        <Loader size={"sm"} />
      </Stack>
    }} />
  )
}

export default AppOverlay;