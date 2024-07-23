import { Button, Loader, Stack, TextInput, Textarea } from "@mantine/core";
import { useForm } from "@mantine/form";
import { FC, useEffect } from "react";
import { IconCertificate } from "@tabler/icons-react";
import { useWeb3ModalAccount } from '@web3modal/ethers/react';
import { useCreateProof } from "@/hooks";
import WalletButton from "@/features/Wallet/WalletButton";
import { Draft, Proof } from "@/types";
import { useLocalStorage } from "@mantine/hooks";

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
  const [drafts, setDrafts] = useLocalStorage<Draft[]>({
    key: "provify-drafts",
    defaultValue: []
  });

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

  const saveDraft = async (values: typeof form.values) => {
    const { name, description } = values;

    const draft: Draft = {
      id: `provify-draft-${Date.now()}`,
      name,
      description,
    }

    setDrafts([...drafts, draft]);
  }

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
                : (
                  <Stack>
                    <Button onClick={() => saveDraft(form.values)} leftSection={<IconCertificate size={18} />} size="md" radius={"lg"}>Save Draft</Button>
                    <Button leftSection={<IconCertificate size={18} />} type="submit" size="md" radius={"lg"}>Submit</Button>
                  </Stack>
                )
            )
            : <WalletButton />
        }
      </Stack>
    </form>
  )
}

export default CreateProofForm;