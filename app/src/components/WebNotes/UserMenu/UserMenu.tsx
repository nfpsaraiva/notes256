import { Button, Group, Menu, Modal, Stack, Tabs, Text, TextInput } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IconLogin2, IconLogout } from "@tabler/icons-react";
import { FC, useState } from "react";
import NoteIcon from "../NoteIcon/NoteIcon";
import { useWebUser } from "@/hooks";

const UserMenu: FC = () => {
  const { user, signup, signin, signout, isConnecting, isConnected } = useWebUser();
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [opened, { open, close }] = useDisclosure(false);
  const [errorMessage, setErrorMessage] = useState('');

  const login = async () => {
    setErrorMessage('');
    await signin({ email, password });

  }

  const register = async () => {
    setErrorMessage('');
    await signup({ email, password });
  }

  if (!isConnected) {
    return (
      <>
        <Modal opened={opened} onClose={close} title="Sign in" radius={"xl"} padding={"xl"}>
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
                      ? <Button radius={"xl"} disabled>Connecting</Button>
                      : <Button radius={"xl"} onClick={() => login()}>Login</Button>
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
                <TextInput type="password" value={password} onChange={e => setPassword(e.target.value)} label="Password" />
                <Group gap={"xs"} justify="flex-end">
                  {
                    isConnecting
                      ? <Button radius={"xl"} disabled>Connecting</Button>
                      : <Button radius={"xl"} onClick={() => register()}>Register</Button>
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
      <Menu radius={"xl"} width={"target"}>
        <Menu.Target>
          <Button radius={"xl"} size="md" variant="subtle" leftSection={<NoteIcon size={20} stroke={2} />} fw={700}>{user?.email}</Button>
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