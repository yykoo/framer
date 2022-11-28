import { useRef } from "react";
import { Droppable } from "react-beautiful-dnd";
import { useForm } from "react-hook-form";
import styled from "styled-components";
import DragabbleCard from "./DragableCard";
import { IToDo, toDoState } from '../atoms';
import { useSetRecoilState } from "recoil";


const Wrapper = styled.div`
  width: 300px;
  paddin-top: 10px;
  background-color: ${(props) => props.theme.boardColor};
  border-radius: 5px;
  min-height: 300px;
  display: flex;
  flex-direction: column;
`;

const Title = styled.h2`
  text-align: center;
  font-weight: 600;
  margin-bottom: 10px;
  font-size: 18px;
`;

const Form = styled.form`
    width: 100%;
    input {
        width:100%;
    }
`;

interface IBoadProps {
    toDos: IToDo[],
    boardId: string,
}


interface IAreaProps {
    isDraggingFromThis: boolean;
    isDraggingOver: boolean;
  }
  
  const Area = styled.div<IAreaProps>`
    background-color: ${(props) =>
        props.isDraggingOver ? "#dfe6e9" : props.isDraggingFromThis ? "#b2bec3" : "trasparent"
    };
    flex-grow:1;
    transition: backgrond-color 0.3s ease-in-out;
    padding: 20px
  `;
  

interface IForm {
    toDo: string;
}

function Board({toDos, boardId}: IBoadProps) {
    const setToDos = useSetRecoilState(toDoState);
    const {register,setValue,handleSubmit } = useForm<IForm>();
    const onValid = ({toDo}:IForm) => {
        const newToDo = {
            id:Date.now(),
            text:toDo,
        };
        setToDos((allBoards) => {
            return {
              ...allBoards,
              [boardId]: [newToDo, ...allBoards[boardId]],
            };
          });
        setValue("toDo", "");
    };

    return (
        <Wrapper>
            <Title>{boardId}</Title>
            <Form onSubmit={handleSubmit(onValid)}>
                <input 
                    {...register("toDo", {required:true})} 
                    type="text" 
                    placeholder={`Add task on ${boardId}`} 
                />
            </Form>    
            <Droppable droppableId={boardId}>
                {(magic, info) => (
                    <Area  
                        isDraggingOver={info.isDraggingOver}
                        isDraggingFromThis={Boolean(info.draggingFromThisWith)}
                        ref={magic.innerRef} {...magic.droppableProps}>
                        {toDos.map((toDo, index) => (
                        <DragabbleCard 
                            key={toDo.id} 
                            index={index} 
                            toDoId={toDo.id} 
                            toDoText={toDo.text} 
                            />
                        ))}
                        {magic.placeholder}
                    </Area>
                )}
            </Droppable>
            
        </Wrapper>
    );
}

export default Board;