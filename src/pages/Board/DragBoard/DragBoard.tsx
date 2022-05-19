import React, { useEffect, useState } from 'react';
import { DragDropContext } from 'react-virtualized-dnd';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../redux/store';
import { setColumns } from '../../../redux/board/board.slice';
import { DragBucket, DragData, Task } from '../../../redux/boards/boards.types';
import { Column } from '../../../components/Column';
import { mapDataToBuckets, moveBuckets, moveItems, restoreTasks } from './Dashboard.utils';
import { DragBoardColumn, DragBoardContent } from './DragBoard.styles';

export const DragBoard = () => {
  const board = useSelector((state: RootState) => state.board.boardData);
  const [buckets, setBuckets] = useState<DragBucket[]>([]);
  const dispatch = useDispatch();
  const name = 'board-group';

  useEffect(() => {
    const initialBuckets = mapDataToBuckets(board);
    setBuckets(initialBuckets);
  }, [board]);

  const onElementDragEndHandler = (e: DragData, destinationId: string, placeholderId: string) => {
    if (e.draggableId.includes('COLUMN')) {
      const filtered = moveBuckets(e, destinationId, buckets);
      dispatch(setColumns(filtered.map((bucket) => bucket.column)));
      return;
    }
    moveItems(e, destinationId, placeholderId, buckets);
    setBuckets([...buckets]);
    dispatch(setColumns(restoreTasks(buckets)));
  };

  const addTaskHandler = (index: number) => {
    buckets[index].column = {
      ...buckets[index].column,
      tasks: [
        ...buckets[index].column.tasks,
        {
          id: Math.random().toString(), //TODO remove it
          title: Math.random().toString(), //TODO remove it
        } as unknown as Task,
      ],
    };
    dispatch(setColumns(buckets.map((bucket) => bucket.column)));
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
              key={`key_${index}`}
              groupName={name}
              bucket={elem}
              title={elem.column.title}
              addTask={() => addTaskHandler(index)}
            />
          </DragBoardColumn>
        ))}
      </DragBoardContent>
    </DragDropContext>
  );
};
