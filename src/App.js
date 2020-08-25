import React, { useEffect } from "react";
import "./App.css";
import AddTodo from "./components/AddTodo";
import TodoList from "./components/TodoList";
import { MirageServer } from "./mirage";

MirageServer();

function App() {
  
  return (
    <div className='container'>
     <AddTodo />
     <TodoList />
    </div>
  );
}

export default App;
