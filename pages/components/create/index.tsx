import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import { ADD_TODO, GET_TODOS } from "../../graphql/mutations";

// create a function to update the cache
const updateCache = (cache: any, { data }: any) => {
  // read the cache
  const existingTodos = cache.readQuery({ query: GET_TODOS });

  // new todo
  const newTodo = data.insert_todos_one;

  // write the cache
  cache.writeQuery({
    query: GET_TODOS,
    data: { todos: [...existingTodos.todos, newTodo] },
  });
};

const CreateTodo = () => {
  // handle state
  const [todo, setTodo] = useState("");
  const [addTodo] = useMutation(ADD_TODO, {
    update: updateCache,
  });

  // handle submit
  const handleSubmit = () => {
    addTodo({ variables: { task: todo } });
    setTodo("");
  };

  return (
    <div
      className="flex items-center justify-between p-4 border-b border-gray-200"
      style={{ width: "500px" }}
    >
      <input
        className="flex-grow h-8 ml-4 bg-transparent focus:outline-none font-medium"
        type="text"
        placeholder="add a new task"
        value={todo}
        onChange={(e) => setTodo(e.target.value)}
        onKeyPress={(e) => {
          if (e.key === "Enter") handleSubmit();
        }}
      />
      <button
        className="px-4 py-2 text-sm font-semibold text-white "
        onClick={handleSubmit}
      >
        <svg
          className="w-5 h-5 text-gray-400 fill-current"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M12 6v6m0 0v6m0-6h6m-6 0H6"
          />
        </svg>
      </button>
    </div>
  );
};

export default CreateTodo;
