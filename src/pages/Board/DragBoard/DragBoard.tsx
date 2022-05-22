import React, { useEffect, useState } from 'react';
import { DragDropContext } from 'react-virtualized-dnd';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, store } from '../../../redux/store';
import { setColumns } from '../../../redux/board/board.slice';
import { DragBucket, DragData, Task } from '../../../redux/boards/boards.types';
import { Column } from '../../../components/Column';
import { mapDataToBuckets, moveItems, restoreTasks } from './Dashboard.utils';
import {
  fetchAllColumns,
  fetchCreateTask,
  fetchDeleteColumn,
  fetchUpdateColumn,
} from '../../../redux/board/board.thunk';

export const DragBoard = () => {
  const board = useSelector((state: RootState) => state.board.boardData);
  const [buckets, setBuckets] = useState<DragBucket[]>([]);
  const dispatch = useDispatch();
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
          store.dispatch(fetchAllColumns({ boardId: board.id }));
        });
      return;
    }
    moveItems(e, destinationId, placeholderId, buckets);
    setBuckets([...buckets]);
    dispatch(setColumns(restoreTasks(buckets)));
  };

  const deleteColumnHandler = (index: number) => {
    store.dispatch(fetchDeleteColumn({ boardId: board.id, columnId: buckets[index].column.id }));
  };

  const addTaskHandler = (index: number) => {
    // buckets[index].column = {
    //   ...buckets[index].column,
    //   tasks: [
    //     ...buckets[index].column.tasks,
    //     {
    //       id: Math.random().toString(), //TODO remove it
    //       title: Math.random().toString(), //TODO remove it
    //     } as unknown as Task,
    //   ],
    // };
    // dispatch(setColumns(buckets.map((bucket) => bucket.column)));

    store
      .dispatch(
        fetchCreateTask({
          boardId: board.id,
          columnId: buckets[index].column.id,
          title: Math.random().toString(),
          description: '1111',
          userId: '',
        })
      )
      .then(() => {
        store.dispatch(fetchAllColumns({ boardId: board.id }));
      });
  };

  return (
    <div style={{ width: '100%', height: 500 }}>
      <DragDropContext
        dragAndDropGroup={name}
        onDragEnd={onElementDragEndHandler}
        outerScrollBar={true}
      >
        <div style={{ display: 'flex', justifyContent: 'left' }}>
          {buckets.map((elem, index: number) => (
            <div
              key={`key_${index}`}
              style={{ border: '1px solid black', backgroundColor: '#EBEBEB', width: 400 }}
            >
              <Column
                groupName={name}
                bucket={elem}
                title={elem.column.title}
                addTask={() => addTaskHandler(index)}
                deleteColumn={() => deleteColumnHandler(index)}
              />
            </div>
          ))}
        </div>
      </DragDropContext>
    </div>
  );
};
