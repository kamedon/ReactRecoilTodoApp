import { atom } from "recoil";
import { Domain } from "../../feature";

export const todoStore = atom<Domain.Todo.Todo[]>({
  key: "store/todo",
  default: [],
});
