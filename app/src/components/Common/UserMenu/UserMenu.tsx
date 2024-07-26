import { useUserbase } from "@/contexts";
import { Button, Group, Menu, Modal, Stack, Text, TextInput } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IconUser } from "@tabler/icons-react";
import { FC, useState } from "react";

const UserMenu: FC = () => {
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const { user, signup, signin, signout } = useUserbase();
  const [opened, { open, close }] = useDisclosure(false);
  const [errorMessage, setErrorMessage] = useState('');

  const login = async () => {
    try {
      await signin(username, password);
    } catch (e: any) {
      setErrorMessage(e.message)
    }
  }

  if (!user) {
    return (
      <>
        <Modal opened={opened} onClose={close} title="Sign in">
          <Stack>
            <TextInput value={username} onChange={e => setUsername(e.target.value)} label="Username" />
            <TextInput value={password} onChange={e => setPassword(e.target.value)} label="Password" />
            <Group gap={"xs"} justify="flex-end">
              <Button variant="subtle" onClick={() => signup(username, password)}>Register</Button>
              <Button onClick={() => login()}>Login</Button>
            </Group>
            {
              errorMessage && <Text c={"red"}>{errorMessage}</Text>
            }
          </Stack>
        </Modal>
        <Button onClick={open}>Use account</Button>
      </>
    )
  }

  return (
    <>

      <Menu>
        <Menu.Target>
          <Button variant="subtle" leftSection={<IconUser size={16} />}>{user.username}</Button>
        </Menu.Target>
        <Menu.Dropdown>
          <Menu.Item color="red" onClick={() => signout()}>
            Logout
          </Menu.Item>
        </Menu.Dropdown>
      </Menu>
    </>
  )
}

export default UserMenu;