import { AppShell } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { createWeb3Modal } from '@web3modal/ethers/react';
import { ethersConfig, mainnet, projectId } from '@/walletconnect';
import { Footer, Header, Main, Navbar } from '@/components/Layout';
import classes from './Home.module.css';
import { FC } from 'react';

const HomePage: FC = () => {
  const [opened, { toggle, close }] = useDisclosure();

  createWeb3Modal({
    ethersConfig,
    chains: [mainnet],
    projectId,
    enableAnalytics: true,
    themeMode: "light"
  });

  return (
    <AppShell
      layout="alt"
      header={{ height: 60 }}
      navbar={{ width: 300, breakpoint: 'sm', collapsed: { desktop: opened, mobile: !opened } }}
      footer={{ height: 60 }}
      padding="md"
    >
      <AppShell.Header className={classes.header} withBorder={false}>
        <Header sidebarOpened={opened} sidebarToggle={toggle} />
      </AppShell.Header>

      <AppShell.Navbar withBorder={true} className={classes.navbar}>
        <Navbar sidebarOpened={opened} sidebarToggle={toggle} sidebarClose={close} />
      </AppShell.Navbar>

      <AppShell.Main className={classes.main}>
        <Main />
      </AppShell.Main>

      <AppShell.Footer className={classes.footer} withBorder={false} py={"md"}>
        <Footer />
      </AppShell.Footer>
    </AppShell>
  );
}

export default HomePage;