import { MenuEnum } from "@/enums";
import { About, HowItWorks, ProofsPanel, Roadmap, VerifyPanel } from "@/features";
import useStore from "@/stores/store";
import { Container } from "@mantine/core";
import { FC, useEffect } from "react";
import { useShallow } from "zustand/react/shallow";

const Main: FC = () => {
  const [
    panel, 
    setPanel,
    setProofId,
  ] = useStore(useShallow(state => [
    state.panel, 
    state.setPanel,
    state.setProofId
  ]));

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const proofId = params.get('proof');

    if (proofId !== null) {
      setPanel(MenuEnum.VERIFY)
      setProofId(proofId);
    }
  }, [])

  return (
    <Container maw={1000} mx={"auto"}>
      {panel === MenuEnum.MY_PROOFS && <ProofsPanel />}
      {panel === MenuEnum.VERIFY && <VerifyPanel />}
      {panel === MenuEnum.HOW_IT_WORKS && <HowItWorks />}
      {panel === MenuEnum.ROADMAP && <Roadmap />}
      {panel === MenuEnum.ABOUT && <About />}
    </Container>
  )
}

export default Main;