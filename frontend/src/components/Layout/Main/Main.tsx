import { MenuEnum } from "@/enums";
import { About, HowItWorks, ProofsPanel, Roadmap, VerifyPanel } from "@/features";
import useStore from "@/stores/store";
import { Container } from "@mantine/core";
import { FC } from "react";
import { useShallow } from "zustand/react/shallow";

const Main: FC = () => {
  const [panel] = useStore(useShallow(state => [state.panel]));

  return (
    <Container maw={800} mx={"auto"}>
      {panel === MenuEnum.MY_PROOFS && <ProofsPanel />}
      {panel === MenuEnum.VERIFY && <VerifyPanel />}
      {panel === MenuEnum.HOW_IT_WORKS && <HowItWorks />}
      {panel === MenuEnum.ROADMAP && <Roadmap />}
      {panel === MenuEnum.ABOUT && <About />}
    </Container>
  )
}

export default Main;