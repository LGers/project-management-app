import React, { useState } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-virtualized-dnd';

interface DragItem {
  id: string;
  name: string;
  isHeader?: boolean;
  isEnd?: boolean;
}

interface DragBucket {
  droppableId: string;
  items: DragItem[];
}

interface DragEvent {
  droppableId: string;
  draggableId: string;
}

const mock: DragBucket[] = [
  {
    droppableId: 'drId1',
    items: [
      { id: 'it14', isHeader: true, name: 'TO DO' },
      { id: 'it1', name: 'Leonid' },
      { id: 'it5', name: 'Sergey' },
      { id: 'END_OF_LIST', isEnd: true, name: '' },
    ],
  },
  {
    droppableId: 'drId2',
    items: [
      { id: 'it13', isHeader: true, name: 'IN PROGRESS' },
      { id: 'it4', name: 'Ivan' },
      { id: 'it15', name: 'Larisa' },
      { id: 'END_OF_LIST', isEnd: true, name: '' },
    ],
  },
  {
    droppableId: 'drId3',
    items: [
      { id: 'it14', isHeader: true, name: 'DONE' },
      { id: 'it2', name: 'Marina' },
      { id: 'it6', name: 'Alex' },
      { id: 'END_OF_LIST', isEnd: true, name: '' },
    ],
  },
];

export const DragBoard = () => {
  const [buckets, setBuckets] = useState<DragBucket[]>(mock);
  const name = 'board-group';

  const onElementDragEndHandler = (e: DragEvent, destinationId: string, placeholderId: string) => {
    const bucketIndex = buckets.findIndex((bucket) => bucket.droppableId === e.droppableId);
    const newIndex = buckets.findIndex((bucket) => bucket.droppableId === destinationId);
    const movingIndex = buckets[bucketIndex].items.findIndex((item) => item.id === e.draggableId);
    let placeholderIndex = buckets[newIndex].items.findIndex((item) => item.id === placeholderId);
    const toMove = buckets[bucketIndex].items[movingIndex];
    buckets[bucketIndex].items = buckets[bucketIndex].items.filter(
      (item) => item.id !== e.draggableId
    );
    if (placeholderIndex === -1) {
      console.log(placeholderIndex);
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
    setBuckets([...buckets]);
  };

  return (
    <DragDropContext
      dragAndDropGroup={name}
      onDragEnd={onElementDragEndHandler}
      outerScrollBar={true}
    >
      <div style={{ display: 'flex', justifyContent: 'space-around' }}>
        {mock.map((elem, index: number) => (
          <div key={`key_${index}`} style={{ border: '1px solid black', width: '33%' }}>
            <Droppable
              containerHeight={600}
              dragAndDropGroup={name}
              droppableId={elem.droppableId}
              key={elem.droppableId}
            >
              {elem.items.map((item, i) => (
                <Draggable
                  key={`key_${i}`}
                  height={30}
                  dragAndDropGroup={name}
                  draggableId={item.id}
                  isSectionHeader={item.isHeader || item.isEnd}
                  disableMove={item.isEnd}
                >
                  <div
                    style={{
                      border: !item.isEnd ? '1px solid black' : undefined,
                      backgroundColor: item.isEnd ? '#EBEBEB' : 'white',
                      height: item.isEnd ? 500 - buckets[index].items.length * 58 : 'inherit',
                      fontWeight: item.isHeader ? 600 : 200,
                    }}
                  >
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
