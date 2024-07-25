import { Select } from "@mantine/core";
import { FC } from "react";

const NetworkSwitcher: FC = () => {
  return (
    <Select
    radius={"lg"}
      data={['Sepolia Blockchain Network']}
      value={'Sepolia Blockchain Network'}
    />
  )
}

export default NetworkSwitcher;