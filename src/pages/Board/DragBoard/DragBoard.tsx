import React, { useEffect, useState } from 'react';
import { DragDropContext } from 'react-virtualized-dnd';
import { useSelector } from 'react-redux';
import { RootState, store } from '../../../redux/store';
import { DragBucket, DragData } from '../../../redux/boards/boards.types';
import { Column } from '../../../components/Column';
import { mapDataToBuckets } from './Dashboard.utils';
import {
  fetchBoard,
  fetchCreateTask,
  fetchDeleteTask,
  fetchUpdateColumn,
} from '../../../redux/board/board.thunk';
import { DragBoardColumn, DragBoardContent } from './DragBoard.styles';

export const DragBoard = () => {
  const board = useSelector((state: RootState) => state.board.boardData);
  const userId = useSelector((state: RootState) => state.auth.userId);
  // const users = useSelector((state: RootState) => state.auth.users);
  // const login = localStorage.getItem('login');
  // const userId = users.find((user) => user.login === login)?.id as string;
  const [buckets, setBuckets] = useState<DragBucket[]>([]);
  const name = 'board-group';

  useEffect(() => {
    setBuckets(mapDataToBuckets(board));
  }, [board]);

  const onElementDragEndHandler = (e: DragData, destinationId: string, placeholderId: string) => {
    if (e.draggableId.includes('COLUMN')) {
      const toMoveIndex = buckets.findIndex((bucket) => bucket.id === e.draggableId);
      const targetIndex = buckets.findIndex((bucket) => bucket.droppableId === destinationId);
      store
        .dispatch(
          fetchUpdateColumn({
            boardId: board.id,
            columnId: buckets[toMoveIndex].column.id,
            title: buckets[toMoveIndex].column.title,
            order: targetIndex + 1,
          })
        )
        .then(() => {
          store.dispatch(fetchBoard(board.id));
        });
      return;
    }
    const bucketIndex = buckets.findIndex((bucket) => bucket.droppableId === e.droppableId);
    const newIndex = buckets.findIndex((bucket) => bucket.droppableId === destinationId);
    const toMoveColumnId = buckets[bucketIndex].column.id;
    const taskIndex = buckets[bucketIndex].items.findIndex((item) => item.id === e.draggableId);
    const toMoveTask = buckets[bucketIndex].items[taskIndex].task;
    store
      .dispatch(
        fetchDeleteTask({ boardId: board.id, columnId: toMoveColumnId, taskId: toMoveTask.id })
      )
      .then(() => {
        store
          .dispatch(
            fetchCreateTask({
              boardId: board.id,
              columnId: buckets[newIndex].column.id,
              title: toMoveTask.title,
              description: toMoveTask.description,
              userId,
            })
          )
          .then(() => {
            store.dispatch(fetchBoard(board.id));
          });
      });
  };

  const addTaskHandler = (index: number, title: string, description: string) => {
    store
      .dispatch(
        fetchCreateTask({
          boardId: board.id,
          columnId: buckets[index].column.id,
          title,
          description,
          userId,
        })
      )
      .then(() => {
        store.dispatch(fetchBoard(board.id));
      });
  };
  return (
    <DragDropContext
      dragAndDropGroup={name}
      onDragEnd={onElementDragEndHandler}
      outerScrollBar={true}
    >
      <DragBoardContent>
        {buckets.map((elem, index: number) => (
          <DragBoardColumn key={`key_${index}`}>
            <Column
              groupName={name}
              bucket={elem}
              title={elem.column.title}
              columnId={elem.column.id}
              order={elem.column.order}
              boardId={board.id}
              addTask={(title: string, description: string) =>
                addTaskHandler(index, title, description)
              }
            />
          </DragBoardColumn>
        ))}
      </DragBoardContent>
    </DragDropContext>
  );
};
