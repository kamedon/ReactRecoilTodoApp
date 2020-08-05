import { Domain, Repository, Store } from "../index";
import { selectorFamily } from "recoil";

export const addTodo = selectorFamily({
  key: "usecase/addTodo",
  get: (todo: Domain.Todo.Todo) => async ({ get }) => {
    await Repository.Todo.addTodo(todo);
    const list: Domain.Todo.Todo[] = get(Store.Todo.todoStore);
    return [...list, todo];
  },
});

export const editTodo = selectorFamily({
    key: 'usecase/editTodo',
    get: (todo: Domain.Todo.Todo) => async ({get}) => {
        const list: Domain.Todo.Todo[] = get(Store.Todo.todoStore)
        return list.map(item => item.title === todo.title ? todo : item)
    },

})

export const todoWith = selectorFamily({
    key: 'usecase/todoWith',
    get: (status: Domain.Todo.Status | 'All') => ({get}) => {
        const list: Domain.Todo.Todo[] = get(Store.Todo.todoStore)
        return list.filter(item => status === 'All' ? true : item.status === status)
    },
})

