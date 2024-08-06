import { modals } from "@mantine/modals";
import { ReactNode } from "react";

const DeleteModal = (
  confirmFn: () => void,
) => {
  modals.openConfirmModal({
    title: "Delete note",
    centered: true,
    children: "'Are you sure you want to delete this note? This action is irreversible'",
    labels: { confirm: 'Delete', cancel: "Cancel" },
    cancelProps: { radius: "xl" },
    confirmProps: { color: 'red', radius: "xl" },
    onConfirm: () => confirmFn
  });
}

export default DeleteModal;