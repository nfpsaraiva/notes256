import { Select } from "@mantine/core";
import { FC } from "react";

const NetworkSwitcher: FC = () => {
  return (
    <Select
      data={['Sepolia Blockchain Network']}
      value={'Sepolia Blockchain Network'}
    />
  )
}

export default NetworkSwitcher;