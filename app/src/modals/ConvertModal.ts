import { NewNote, Note } from "@/types";
import { modals } from "@mantine/modals";

const ConvertModal = (
  {name, description}: Note,
  confirmFn: (note: NewNote) => void,
) => {
  return modals.openConfirmModal({
    title: "Delete note",
    centered: true,
    children: "Are you sure you want to convert this note? This action is irreversible",
    labels: { confirm: 'Convert', cancel: "Cancel" },
    cancelProps: { radius: "xl" },
    confirmProps: { radius: "xl" },
    onConfirm: () => confirmFn({name, description})
  });
}

export default ConvertModal;