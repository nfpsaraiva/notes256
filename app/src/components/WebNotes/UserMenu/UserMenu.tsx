import { useSupabase } from "@/contexts";
import { Button, Group, Menu, Modal, Stack, Tabs, Text, TextInput } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IconLogin2, IconLogout } from "@tabler/icons-react";
import { FC, useState } from "react";
import NoteIcon from "../NoteIcon/NoteIcon";

const UserMenu: FC = () => {
  const {user, signup, signin, signout, isConnecting} = useSupabase();
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [opened, { open, close }] = useDisclosure(false);
  const [errorMessage, setErrorMessage] = useState('');

  const login = async () => {
    setErrorMessage('');

    const {error} = await signin(email, password);

    if (error) {
      setErrorMessage(error.message);
    }
  }

  const register = async () => {
    setErrorMessage('');

    const {error} = await signup(email, password);

    if (error) {
      setErrorMessage(error.message);
    } else {
      setErrorMessage('Check your email for the login link!')
    }

  }

  if (!user) {
    return (
      <>
        <Modal opened={opened} onClose={close} title="Sign in">
          <Tabs defaultValue={"login"} >
            <Tabs.List grow>
              <Tabs.Tab value="login">Login</Tabs.Tab>
              <Tabs.Tab value="register">Register</Tabs.Tab>
            </Tabs.List>
            <Tabs.Panel value="login">
              <Stack my={"md"}>
                <TextInput value={email} onChange={e => setEmail(e.target.value)} label="Email" />
                <TextInput type="password" value={password} onChange={e => setPassword(e.target.value)} label="Password" />
                <Group gap={"xs"} justify="flex-end">
                  {
                    isConnecting
                      ? <Button disabled>Connecting</Button>
                      : <Button onClick={() => login()}>Login</Button>
                  }

                </Group>
                {
                  errorMessage && <Text c={"red"}>{errorMessage}</Text>
                }
              </Stack>
            </Tabs.Panel>
            <Tabs.Panel value="register">
              <Stack my={"md"}>
                <TextInput value={email} onChange={e => setEmail(e.target.value)} label="Email" />
                <TextInput value={password} onChange={e => setPassword(e.target.value)} label="Password" />
                <Group gap={"xs"} justify="flex-end">
                  {
                    isConnecting
                      ? <Button disabled>Connecting</Button>
                      : <Button onClick={() => register()}>Register</Button>
                  }

                </Group>
                {
                  errorMessage && <Text c={"red"}>{errorMessage}</Text>
                }
              </Stack>
            </Tabs.Panel>
          </Tabs>
        </Modal>
        <Button onClick={open} radius={"xl"} leftSection={<IconLogin2 size={20} />}>Connect account</Button>
      </>
    )
  }

  return (
    <>
      <Menu radius={"xl"}>
        <Menu.Target>
          <Button radius={"xl"} size="md" variant="subtle" leftSection={<NoteIcon size={20} stroke={2} />} fw={700}>{user.email}</Button>
        </Menu.Target>
        <Menu.Dropdown>
          <Menu.Item leftSection={<IconLogout size={20} stroke={2} />} color="red" onClick={e => {
            e.stopPropagation();
            signout();
          }}>
            Logout
          </Menu.Item>
        </Menu.Dropdown>
      </Menu>
    </>
  )
}

export default UserMenu;