import { Center, Loader } from "@mantine/core";
import { FC } from "react";

const BlockchainLoader: FC = () => {
  return (
    <Center>
      <Loader type="bars" size={"xs"} />
    </Center>
  )
}

export default BlockchainLoader;