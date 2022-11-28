import { atom } from "recoil";

export interface IToDo {
  id:number;
  text:string;
}

interface IToDoState {
  [key: string]: IToDo[];
}

export const toDoState = atom<IToDoState>({
  key: "toDo",
  //default: ["a", "b", "c", "d", "e", "f"],
  default: {
    "To Do": [],
    Doing: [],
    Done: [],
  }
});




//type categories = "TO_DO" | "DOING" | "DONE";
/**
export enum categories {
  "TO_DO" = "TO_DO",
  "DOING" = "DOING",
  "DONE" = "DONE",
}

export interface IToDo {
  text: string;
  id: number;
  category:categories;
}

export const categoryState = atom<categories>({
  key: "category",
  default: categories.TO_DO,
});

export const toDoState = atom<IToDo[]>({
  key: "toDo",
  default: [],
});

export const toDoSelector = selector({
  key: "toDoSelector",
  get: ({ get }) => {
    const toDos = get(toDoState);
    const category = get(categoryState);
    return toDos.filter((toDo) => toDo.category === category);
  },
});
**/
