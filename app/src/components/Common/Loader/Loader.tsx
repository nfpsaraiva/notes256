import { Center, Loader as MantineLoader } from "@mantine/core";
import { FC } from "react";

const Loader: FC = () => {
  return (
    <Center>
      <MantineLoader type="bars" size={"xs"} />
    </Center>
  )
}

export default Loader;