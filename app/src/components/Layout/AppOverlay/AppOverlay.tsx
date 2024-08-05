import { LoadingOverlay, Stack, Loader, Title, Group, Image } from "@mantine/core";
import { FC } from "react";
import appIcon from "../../../assets/app-icon.png";


const AppOverlay: FC = () => {
  return (
    <LoadingOverlay visible={true} overlayProps={{ backgroundOpacity: 1 }} loaderProps={{
      children: <Stack align='center' gap={"lg"}>
        <Group align='end'>
          <Image src={appIcon} w={40} />
          <Title order={1}>Notes256</Title>
        </Group>
        <Loader size={"sm"} />
      </Stack>
    }} />
  )
}

export default AppOverlay;