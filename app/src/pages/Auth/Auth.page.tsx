import { AppShell } from "@/components/Layout";
import { MainTitle } from "@/components/UI/MainTitle";
import { useUserbase } from "@/contexts";
import { Button, Card, Stack, Text, TextInput } from "@mantine/core";
import { FC, useState } from "react";

const Auth: FC = () => {
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const { user, signup, signin, signout } = useUserbase();

  const register = async () => {
    const userResult = await signup(username, password);

    console.log(userResult)
  }

  const login = async () => {
    const userResult = await signin(username, password);

    console.log(userResult);
  }

  return (
    <AppShell>
      <Stack gap={"lg"}>
        <MainTitle title="Auth" subtitle="Testing" />

        <Card>
          <Text>Hello {user?.username}</Text>
        </Card>

        <Stack>
          <TextInput value={username} onChange={e => setUsername(e.target.value)} label="Username" />
          <TextInput value={password} onChange={e => setPassword(e.target.value)} label="Password" />
          <Button onClick={() => login()}>Login</Button>
          <Button onClick={() => register()}>Register</Button>
          <Button onClick={() => signout()} color="red">Logout</Button>
        </Stack>
      </Stack>
    </AppShell>
  )
}

export default Auth;