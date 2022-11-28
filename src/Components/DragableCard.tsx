import React from 'react';
import { Draggable } from 'react-beautiful-dnd';
import styled from 'styled-components';

const Card = styled.div<{isDragging: boolean}>`
  border-radius: 5px;
  margin-bottom: 5px;
  padding: 10px 10px;
  background-color: ${(props) => props.isDragging ? "#e4f2ff" : props.theme.cardColor};
  box-shadow: ${props => props.isDragging ? " 2px 2px 5px rgba(0,0,0,0.1)" : "none"}
`;

interface IDragabbleCardProps {
    toDoId: number,
    toDoText:string,
    index: number,
}

function DragabbleCard({toDoId, toDoText, index}:IDragabbleCardProps) {
    return (
        <Draggable key={toDoId} draggableId={toDoId+""} index={index}>
        {(magic, snapshot) => (
          <Card 
            isDragging={snapshot.isDragging}
            ref={magic.innerRef}  {...magic.dragHandleProps} {...magic.draggableProps}>
            <span>🔥</span>
            {toDoText}
          </Card>
        )}
      </Draggable>
    );
}

/**
 * props 가 변하지 않는다면 재렌더링 하지말라
 */
export default React.memo(DragabbleCard);