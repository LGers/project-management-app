import { DragItem } from '../../redux/boards/boards.types';

export type TaskProps = {
  id: string;
  name: string;
  task: {
    id: string;
    title: string;
  };
};

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
  item: DragItem;
}
