import { MenuEnum } from "@/enums";
import { Proofs } from "@/features";
import VerifyProofForm from "@/features/VerifyProof/VerifyProofForm";
import useStore from "@/stores/store";
import { Container } from "@mantine/core";
import { FC } from "react";
import { useShallow } from "zustand/react/shallow";

const Main: FC = () => {
  const [panel] = useStore(useShallow(state => [state.panel]));

  return (
    <Container maw={800} mx={"auto"}>
      {panel === MenuEnum.MY_PROOFS && <Proofs />}
      {panel === MenuEnum.VERIFY && <VerifyProofForm />}
    </Container>
  )
}

export default Main;