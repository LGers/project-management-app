import * as React from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-virtualized-dnd';
import { DragBucket, DragData } from '../../redux/boards/boards.types';
import {
  mapDataToBuckets,
  moveBuckets,
  moveItems,
  restoreTasks,
} from './DragBoard/Dashboard.utils';
import { setColumns } from '../../redux/board/board.slice';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';

type Props = {
  name: string;
};

const elemsToRender = [
  {
    items: [
      { id: '1-1', name: 'name1-1' },
      { id: '1-2', name: 'name1-2' },
      { id: '1-2', name: 'name1-2' },
    ],
  },
  { items: [{ id: '2-1', name: 'name2-1' }] },
  { items: [{ id: '3-1', name: 'name3-1' }] },
  { items: [{ id: '4-1', name: 'name4' }] },
  { items: [{ id: '5-1', name: 'name5' }] },
  { items: [{ id: '6-1', name: 'name6' }] },
];

export const TestDrag = () => {
  const board = useSelector((state: RootState) => state.board.boardData);
  useEffect(() => {
    const initialBuckets = mapDataToBuckets(board);
    // setBuckets(initialBuckets);
  }, [board]);
  const [buckets, setBuckets] = useState([]);
  const name = 'my-group';
  // const elemsToRender = [{ name: 'name1' }, { name: 'name2' }, { name: 'name3' }];

  const onElementDragEndHandler = (e: DragData, destinationId: string, placeholderId: string) => {
    if (e.draggableId.includes('COLUMN')) {
      const filtered = moveBuckets(e, destinationId, buckets);
      // dispatch(setColumns(filtered.map((bucket) => bucket.column)));
      return;
    }
    moveItems(e, destinationId, placeholderId, buckets);
    setBuckets([...buckets]);
    // dispatch(setColumns(restoreTasks(buckets)));
  };

  return (
    <DragDropContext
      dragAndDropGroup={name}
      onDragEnd={onElementDragEndHandler}
      outerScrollBar={true}
    >
      <div className={'your-drag-container'}>
        {elemsToRender.map((elem, index) => (
          <div className={'your-droppable-container'} key={index}>
            <Droppable dragAndDropGroup={name} droppableId={index} key={index}>
              {elem.items.map((item) => (
                <Draggable dragAndDropGroup={name} draggableId={item.id} key={item.id}>
                  <div className="your-draggable-element">
                    <p>{item.name}</p>
                  </div>
                </Draggable>
              ))}
            </Droppable>
          </div>
        ))}
      </div>
    </DragDropContext>
  );
};
