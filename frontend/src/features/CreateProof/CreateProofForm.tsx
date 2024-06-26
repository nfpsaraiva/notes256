import { Button, Stack, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import { useWeb3ModalAccount } from "@web3modal/ethers/react";
import { FC } from "react";
import WalletButton from "../Wallet/WalletButton";
import { notifications } from "@mantine/notifications";

interface CreateProofFormProps {
  closeModal: () => void
}

const CreateProofForm: FC<CreateProofFormProps> = ({closeModal}: CreateProofFormProps) => {
  const { isConnected } = useWeb3ModalAccount();

  const form = useForm({
    initialValues: {
      name: ""
    },
    validate: {
      name: value => value.length > 0 ? null : "Invalid name"
    }
  });

  const handleSubmit = (values: typeof form.values) => {
    console.log(values);

    notifications.show({
      title: 'Default notification',
      message: 'Hey there, your code is awesome! 🤥',
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
        {
          isConnected
            ? <Button color="blue" type="submit">Submit</Button>
            : <WalletButton />
        }
      </Stack>
    </form>
  )
}

export default CreateProofForm;