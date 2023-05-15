import React from "react";
import TodoList from "../components/TodoList";

const Homepage = (props) => {
  return (
    <div className='todo-app'>
      <TodoList />
    </div>
  );
};

export default Homepage;
