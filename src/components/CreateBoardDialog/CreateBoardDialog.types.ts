export type CreateBoardDialogProps = {
  itemName: string;
  open: boolean;
  setOpen: (isOpen: boolean) => void;
  createBoard: (title: string, description: string) => void;
};
