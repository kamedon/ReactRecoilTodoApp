import { Domain } from "../index";

export const addTodo = async (todo: Domain.Todo.Todo) => {
  await new Promise((resolve) => {
    // APIなどで登録処理
    setTimeout(() => {
      resolve(true);
    }, 1000);
  });
};
