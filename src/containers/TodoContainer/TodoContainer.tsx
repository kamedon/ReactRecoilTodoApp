import React, { FC, useCallback, useState } from "react";
import { useRecoilCallback, useRecoilValue } from "recoil";
import { Domain, Store, UseCase } from "../../feature";

const TodoContainer: FC = () => {
  const [title, setTitle] = useState<string>("");
  const [statusFilter, setStatusFilter] = useState<Domain.Todo.Status | "All">(
    "All"
  );
  const [loading, setLoading] = useState<boolean>(false);
  const todos = useRecoilValue(UseCase.Todo.todoWith(statusFilter));

  const addTodo = useRecoilCallback(
    ({ snapshot, set }) => async (todo: Domain.Todo.Todo) => {
      setLoading(true);
      try {
        const response = await snapshot.getPromise(UseCase.Todo.addTodo(todo));
        set(Store.Todo.todoStore, response);
        setTitle("");
      } catch (e) {
        // Error処理
      } finally {
        setLoading(false);
      }
    },
    []
  );

  const changeStatusTodo = useRecoilCallback(
    ({ snapshot, set }) => async (todo: Domain.Todo.Todo) => {
      setLoading(true);
      try {
        const response = await snapshot.getPromise(UseCase.Todo.editTodo(todo));
        set(Store.Todo.todoStore, response);
      } catch (e) {
        // Error処理
      } finally {
        setLoading(false);
      }
    },
    []
  );

  const onAddClick = useCallback(() => {
    const todo: Domain.Todo.Todo = {
      title,
      status: "ISSUE",
    };
    addTodo(todo);
  }, [addTodo, title]);

  const onWipClick = useCallback(
    (todo: Domain.Todo.Todo) => {
      changeStatusTodo({ ...todo, status: "WIP" });
    },
    [changeStatusTodo]
  );

  const onChangeText = useCallback(({ target: { value } }) => {
    setTitle(value ?? "");
  }, []);

  const onChangeFilter = useCallback((status: Domain.Todo.Status | "All") => {
    setStatusFilter(status);
  }, []);

  return (
    <div>
      <div>
        <input type="text" value={title} onChange={onChangeText} />
        <button onClick={onAddClick}>Add</button>
      </div>
      <div>
        filter:
        <button onClick={() => onChangeFilter("All")}>All</button>
        <button onClick={() => onChangeFilter("WIP")}>WIP</button>
      </div>
      {todos.map((item, index) => (
        <div key={index}>
          <div>
            {item.title}: {item.status} :{" "}
            <button onClick={() => onWipClick(item)}>WIP</button>
          </div>
        </div>
      ))}
      {loading && <div>loading...</div>}
    </div>
  );
};

export default TodoContainer;
