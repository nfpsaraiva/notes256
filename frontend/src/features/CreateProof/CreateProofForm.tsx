import { Button, Stack, Text, TextInput, Textarea, Title } from "@mantine/core";
import { useForm } from "@mantine/form";
import { FC } from "react";
import { IconCertificate } from "@tabler/icons-react";
import WalletButton from "../Wallet/WalletButton";
import { useWeb3ModalAccount } from '@web3modal/ethers/react';
import { useCreateProof } from "@/hooks";

interface CreateProofFormProps {
  closeModal: () => void
}

const CreateProofForm: FC<CreateProofFormProps> = ({ closeModal }: CreateProofFormProps) => {
  const { isConnected } = useWeb3ModalAccount();
  const { createProof } = useCreateProof();

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


  const handleSubmit = async (values: typeof form.values) => {
    createProof({
      name: values.name,
      description: values.description
    });

    closeModal();
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
            ? <Button leftSection={<IconCertificate size={18} />} type="submit">Submit</Button>
            : <WalletButton />
        }
      </Stack>
    </form>
  )
}

export default CreateProofForm;