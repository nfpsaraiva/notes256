import type { Meta, StoryObj } from '@storybook/react';

import SidebarToggle from './SidebarToggle';

const meta: Meta<typeof SidebarToggle> = {
  component: SidebarToggle,
};

export default meta;
type Story = StoryObj<typeof SidebarToggle>;

const toggle = () => console.log("toogle");

export const Primary: Story = {
  args: {
    toggle,
  },
};