import { ActionIcon, useMantineColorScheme, useComputedColorScheme } from '@mantine/core';
import { IconSun, IconMoon } from '@tabler/icons-react';
import cx from 'clsx';
import classes from './ColorSchemeToggle.module.css';
import { useWeb3ModalTheme } from '@web3modal/ethers/react';

function ColorSchemeToggle() {
  const { setColorScheme } = useMantineColorScheme();
  const computedColorScheme = useComputedColorScheme('light', { getInitialValueInEffect: true });
  const { setThemeMode } = useWeb3ModalTheme();

  const toggleTheme = (mode: 'light' | 'dark') => {
    setColorScheme(mode);
    setThemeMode(mode);
  }

  return (
    <ActionIcon
      onClick={() => toggleTheme(computedColorScheme === 'light' ? 'dark' : 'light')}
      variant="transparent"
      size="lg"
      aria-label="Toggle color scheme"
      color='color="--mantine-color-text"'
    >
      <IconSun className={cx(classes.icon, classes.light)} stroke={2} />
      <IconMoon className={cx(classes.icon, classes.dark)} stroke={2} />
    </ActionIcon>
  );
}

export default ColorSchemeToggle;