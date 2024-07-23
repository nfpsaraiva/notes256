import { Button, Loader, Stack, TextInput, Textarea } from "@mantine/core";
import { useForm } from "@mantine/form";
import { FC, useEffect } from "react";
import { IconCertificate } from "@tabler/icons-react";
import { useWeb3ModalAccount } from '@web3modal/ethers/react';
import { useCreateProof } from "@/hooks";
import WalletButton from "@/features/Wallet/WalletButton";

interface CreateProofFormProps {
  modalOpened: boolean,
  closeModal: () => void
}

const CreateProofForm: FC<CreateProofFormProps> = ({
  modalOpened,
  closeModal
}: CreateProofFormProps) => {
  const { isConnected } = useWeb3ModalAccount();
  const { createProof, creatingProof, proofCreated } = useCreateProof();

  const form = useForm({
    initialValues: {
      name: "",
      description: ""
    },
    validate: {
      name: value => value.length > 0 ? null : "Can't be empty",
      description: value => value.length > 0 ? null : "Can't be empty",
    }
  });

  const handleSubmit = async (values: typeof form.values) => {
    createProof({
      name: values.name,
      description: values.description
    });
  };

  useEffect(() => {
    if (modalOpened && proofCreated) {
      closeModal();
    }
  }, [modalOpened, proofCreated]);

  return (
    <form onSubmit={form.onSubmit(handleSubmit)}>
      <Stack>
        <TextInput
          withAsterisk
          label="Title"
          placeholder="The proof name"
          key={form.key("name")}
          {...form.getInputProps("name")}
        />
        <Textarea
          label="Description"
          placeholder="The proof description"
          description="This will save as a plain text"
          autosize
          maxLength={500}
          minRows={6}
          withAsterisk
          key={form.key("description")}
          {...form.getInputProps("description")}
        />
        {
          isConnected
            ? (
              creatingProof
                ? <Button leftSection={<Loader type="bras" size={"xs"} />} disabled size="md" radius={"lg"}>
                  Creating Proof
                </Button>
                : <Button leftSection={<IconCertificate size={18} />} type="submit" size="md" radius={"lg"}>Submit</Button>
            )
            : <WalletButton />
        }
      </Stack>
    </form>
  )
}

export default CreateProofForm;