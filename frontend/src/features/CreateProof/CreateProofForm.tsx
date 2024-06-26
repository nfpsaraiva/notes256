import { Button, Stack, TextInput, Textarea } from "@mantine/core";
import { useForm } from "@mantine/form";
import { FC } from "react";
import { IconCertificate } from "@tabler/icons-react";
import WalletButton from "../Wallet/WalletButton";
import { useWeb3ModalAccount, useWeb3ModalProvider } from '@web3modal/ethers/react';
import useCreateProof from "@/hooks/useCreateProof";

interface CreateProofFormProps {
  closeModal: () => void
}

const CreateProofForm: FC<CreateProofFormProps> = ({ closeModal }: CreateProofFormProps) => {
  const { walletProvider } = useWeb3ModalProvider()
  const { isConnected } = useWeb3ModalAccount();

  const form = useForm({
    initialValues: {
      name: "",
      description: ""
    },
    validate: {
      name: value => value.length > 0 ? null : "Invalid name",
      description: value => value.length > 0 ? null : "Invalid name",
    }
  });

  const { createProof } = useCreateProof(form.getValues().name, form.getValues().description);

  const handleSubmit = async (values: typeof form.values) => {
    await createProof();
  };

  return (
    <form onSubmit={form.onSubmit(handleSubmit)}>
      <Stack>
        <TextInput
          withAsterisk
          label="Name"
          placeholder="The proof name"
          key={form.key("name")}
          {...form.getInputProps("name")}
        />
        <Textarea
          label="Description"
          placeholder="The proof description"
          key={form.key("description")}
          {...form.getInputProps("description")}
        />
        {
          isConnected
            ? <Button leftSection={<IconCertificate size={18} />} color="blue" type="submit">Create Proof</Button>
            : <WalletButton />
        }
      </Stack>
    </form>
  )
}

export default CreateProofForm;