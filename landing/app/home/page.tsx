'use client'

import { AppShell } from '@/components/Layout';
import { Center, Stack } from '@mantine/core';
import { useScrollIntoView } from '@mantine/hooks';
import { FC } from 'react';
import { ContactsHero, FeaturesHero, HomeHero } from '@/components/Heros';

const Home: FC = () => {
  const {
    scrollIntoView: scrollHome,
    targetRef: targetHome
  } = useScrollIntoView<HTMLDivElement>({ offset: 60, duration: 600 });

  const {
    scrollIntoView: scrollAbout,
    targetRef: targetAbout
  } = useScrollIntoView<HTMLDivElement>({ offset: 60, duration: 600 });

  const {
    scrollIntoView: scrollContacts,
    targetRef: targetContacts
  } = useScrollIntoView<HTMLDivElement>({ offset: 60, duration: 600 });

  return (
    <AppShell scrollHome={scrollHome} scrollAbout={scrollAbout} scrollContacts={scrollContacts}>
      <Center h={"100vh"} bg={"var(--mantine-color-gray-1)"} ref={targetHome}>
        <HomeHero scrollAbout={scrollAbout} />
      </Center>
      <Center h={"100vh"} ref={targetAbout}>
        <FeaturesHero />
      </Center>
      <Center h={"10vh"} ref={targetContacts}>
        <ContactsHero />
      </Center>
    </AppShell>
  );
}

export default Home;