import React, { FC, useCallback, useState } from "react";
import { useRecoilCallback, useRecoilValue } from "recoil";
import { Domain, Store, UseCase } from "../../feature";
import { useTodoContainer } from "./hooks";

const TodoContainer: FC = () => {
  const { state, actions } = useTodoContainer();
  return (
    <div>
      <div>
        <input
          type="text"
          value={state.todoForm.title}
          onChange={actions.onChangeText}
        />
        <button onClick={actions.onAddClick}>Add</button>
      </div>
      <div>
        filter:
        <button onClick={() => actions.onChangeFilter("All")}>All</button>
        <button onClick={() => actions.onChangeFilter("WIP")}>WIP</button>
      </div>
      {state.todos.map((item, index) => (
        <div key={index}>
          <div>
            {item.title}: {item.status} :{" "}
            <button onClick={() => actions.onWipClick(item)}>WIP</button>
          </div>
        </div>
      ))}
      {state.loading && <div>loading...</div>}
    </div>
  );
};

export default TodoContainer;
