import { Center, Text } from "@mantine/core";
import { FC } from "react";

const Footer: FC = () => {
  return (
    <Center h={"100%"}>
      <Text size='xs'><strong>{import.meta.env.VITE_CHAIN_NAME}</strong> Blockchain Network</Text>
    </Center>
  )
}

export default Footer;