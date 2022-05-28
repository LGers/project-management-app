import { DragItem } from '../../redux/boards/boards.types';

export type ITaskItem = {
  id: string;
  title: string;
  order: number;
  description: string;
  userId: string;
  boardId: string;
  columnId: string;
};

export interface ITaskProp {
  open: boolean;
  onClose: (value: boolean) => void;
  openDelDialog: () => void;
  onUpdateTask: (newTitle: string, newDescription: string) => void;
  item: DragItem;
  boardId: string;
  columnId: string;
}

export type TaskCardProps = {
  item: DragItem;
  boardId: string;
  columnId: string;
  onClick: () => void;
};
