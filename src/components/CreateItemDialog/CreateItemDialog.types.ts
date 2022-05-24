export type CreateItemDialogProps = {
  itemName: string;
  open: boolean;
  setOpen: (isOpen: boolean) => void;
  createItem: (title: string, description: string) => void;
};
