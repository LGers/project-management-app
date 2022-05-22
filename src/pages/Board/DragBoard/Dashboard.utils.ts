import { Board, Column, DragBucket, DragData } from '../../../redux/boards/boards.types';

const getItems = (column: Column) => {
  const header = { id: 'HEADER', name: column.title, isHeader: true };
  const end = { id: 'END_OF_LIST', isEnd: true, name: '' };
  const middle = column?.tasks?.map((task) => {
    return { id: task.id, name: task.title, task };
  });
  if (middle && middle.length) {
    return [header, ...middle, end];
  }
  return [header, end];
};

const mapDataToBuckets = (board: Board) => {
  let id = 0;
  if (!board?.columns) return [];

  return board.columns
    .filter((c) => c)
    .sort((a, b) => a.order - b.order)
    .map((column) => {
      return {
        droppableId: `drop_${id++}`,
        column,
        ...column,
        id: `COLUMN_${id++}`,
        items: getItems(column),
      } as unknown as DragBucket;
    });
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

export { moveItems, mapDataToBuckets, restoreTasks };
