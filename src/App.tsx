import React from "react";
import "./App.css";
import { RecoilRoot } from "recoil";
import TodoContainer from "./containers/TodoContainer/TodoContainer";

function App() {
  return (
    <RecoilRoot>
      <TodoContainer />
    </RecoilRoot>
  );
}

export default App;
