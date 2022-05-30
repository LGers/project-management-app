export type AddTaskCardProps = {
  open: boolean;
  setOpen: (isOpen: boolean) => void;
  addTask: (title: string, description: string) => void;
};
