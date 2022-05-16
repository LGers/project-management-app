import { Board, DragBucket, DragData } from '../../../redux/boards/boards.types';

const mapDataToBuckets = (board: Board) => {
  let id = 0;
  return board.columns.map((column) => {
    return {
      droppableId: `drop_${id++}`,
      column,
      ...column,
      id: `COLUMN_${id++}`,
      items: [
        { id: '1', name: column.title, isHeader: true },
        ...column.tasks.map((task) => {
          return { id: task.id, name: task.title, task };
        }),
        { id: 'END_OF_LIST', isEnd: true, name: '' },
      ],
    } as unknown as DragBucket;
  });
};

const moveBuckets = (e: DragData, destinationId: string, buckets: DragBucket[]) => {
  const toMoveIndex = buckets.findIndex((bucket) => bucket.id === e.draggableId);
  const bucketToMove = { ...buckets[toMoveIndex] };
  const indx = buckets.findIndex((bucket) => bucket.droppableId === destinationId);
  buckets[toMoveIndex].id = 'DELETE';
  buckets.splice(indx, 0, bucketToMove);
  return buckets.filter((a) => a.id !== 'DELETE');
};

const moveItems = (
  e: DragData,
  destinationId: string,
  placeholderId: string,
  buckets: DragBucket[]
) => {
  const bucketIndex = buckets.findIndex((bucket) => bucket.droppableId === e.droppableId);
  const newIndex = buckets.findIndex((bucket) => bucket.droppableId === destinationId);
  const movingIndex = buckets[bucketIndex].items.findIndex((item) => item.id === e.draggableId);
  let placeholderIndex = buckets[newIndex].items.findIndex((item) => item.id === placeholderId);
  const toMove = buckets[bucketIndex].items[movingIndex];
  buckets[bucketIndex].items = buckets[bucketIndex].items.filter(
    (item) => item.id !== e.draggableId
  );
  if (placeholderIndex === -1) {
    buckets[newIndex].items = [
      buckets[newIndex].items[0],
      toMove,
      ...buckets[newIndex].items.slice(1),
    ];
  } else {
    if (buckets[newIndex].items[placeholderIndex].isEnd) {
      placeholderIndex--;
    }
    buckets[newIndex].items.splice(placeholderIndex, 0, toMove);
  }
};

const restoreTasks = (buckets: DragBucket[]) => {
  return buckets.map((bucket) => {
    return {
      ...bucket.column,
      tasks: bucket.items.map((item) => item.task).filter((t) => t),
    };
  });
};

export { moveBuckets, moveItems, mapDataToBuckets, restoreTasks };
