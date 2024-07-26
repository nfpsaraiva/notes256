import { AppShell } from "@/components/Layout";
import { MainTitle } from "@/components/UI/MainTitle";
import { Center, Stack, Text } from "@mantine/core";
import { FC } from "react";

const Team: FC = () => {
  return (
    <AppShell userMenu={<></>}>
      <Stack>
        <MainTitle title="Team" />
        <Center>
          <Text>nfpsaraiva.com</Text>
        </Center>
      </Stack>
    </AppShell>
  )
}

export default Team;