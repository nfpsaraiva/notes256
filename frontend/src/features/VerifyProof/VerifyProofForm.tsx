import { Button, Stack, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import { IconCheck } from "@tabler/icons-react";
import { FC } from "react";

interface VerifyProofFormProps {
  closeModal: () => void
}

const VerifyProofForm: FC<VerifyProofFormProps> = ({ closeModal }: VerifyProofFormProps) => {
  const form = useForm({
    initialValues: {
      proofId: ""
    },
    validate: {
      proofId: value => value.length > 0 ? null : "Invalid proof ID"
    }
  });

  const handleSubmit = (values: typeof form.values) => {
    console.log(values);


    closeModal();
  }

  return (
    <form onSubmit={form.onSubmit(handleSubmit)}>
      <Stack>
        <TextInput
          withAsterisk
          label="Proof ID"
          placeholder="Enter the proof ID"
          key={form.key("proofId")}
          {...form.getInputProps("proofId")}
        />

        <Button leftSection={<IconCheck size={18} />} type="submit">Verify</Button>
      </Stack>
    </form>
  )
}

export default VerifyProofForm;