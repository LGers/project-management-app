import React, { useEffect, useState } from 'react';
import { DragDropContext } from 'react-virtualized-dnd';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, store } from '../../../redux/store';
import { setColumns } from '../../../redux/board/board.slice';
import { DragBucket, DragData } from '../../../redux/boards/boards.types';
import { Column } from '../../../components/Column';
import { mapDataToBuckets, moveItems, restoreTasks } from './Dashboard.utils';
import {
  fetchAllColumns,
  fetchBoard,
  fetchCreateTask,
  fetchUpdateColumn,
  fetchUpdateTack,
} from '../../../redux/board/board.thunk';
import { DragBoardColumn, DragBoardContent } from './DragBoard.styles';
import { updateTask } from '../../../api/tasks';

export const DragBoard = () => {
  const board = useSelector((state: RootState) => state.board.boardData);
  const users = useSelector((state: RootState) => state.auth.users);
  const login = localStorage.getItem('login');
  const userId = users.find((user) => user.login === login)?.id as string;
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
    const movingIndex = buckets[bucketIndex].items.findIndex((item) => item.id === e.draggableId);
    const task = buckets[bucketIndex].items[movingIndex].task;

    store.dispatch(
      fetchUpdateTack({
        boardId: board.id,
        columnId: buckets[bucketIndex].column.id,
        taskId: task.id,
        title: buckets[bucketIndex].items[movingIndex].task.title,
        order: newIndex + 1,
        description: '123',
        userId,
      })
    );
  };

  const addTaskHandler = (index: number) => {
    store
      .dispatch(
        fetchCreateTask({
          boardId: board.id,
          columnId: buckets[index].column.id,
          title: Math.random().toString(),
          description: 'not empty',
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
              addTask={() => addTaskHandler(index)}
            />
          </DragBoardColumn>
        ))}
      </DragBoardContent>
    </DragDropContext>
  );
};
