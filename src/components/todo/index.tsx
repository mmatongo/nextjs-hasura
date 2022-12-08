import React from "react";
import { useMutation } from "@apollo/client";

import {
  GET_TODOS,
  REMOVE_TODO,
  TOGGLE_COMPLETED,
} from "../../graphql/mutations";

const Todo = ({ todo }: any) => {
  const [removeTodoMutation] = useMutation(REMOVE_TODO);
  const [toggleCompeletedMutation] = useMutation(TOGGLE_COMPLETED);

  const toggleCompleted = ({ id, completed }: any) => {
    toggleCompeletedMutation({
      variables: {
        id,
        completed: !completed,
      },
      optimisticResponse: true,
      update: (cache) => {
        const existingTodos: any = cache.readQuery({ query: GET_TODOS });
        const updatedTodos = existingTodos.todos.map((todo: { id: any }) => {
          if (todo.id === id) {
            return {
              ...todo,
              completed: !completed,
            };
          }
          return todo;
        });
        cache.writeQuery({
          query: GET_TODOS,
          data: { todos: updatedTodos },
        });
      },
    });
  };

  const removeTodo = (id: any) => {
    removeTodoMutation({
      variables: { id },
      optimisticResponse: true,
      update: (cache) => {
        const existingTodos: any = cache.readQuery({ query: GET_TODOS });
        const updatedTodos = existingTodos.todos.filter(
          (todo: { id: any }) => todo.id !== id
        );
        cache.writeQuery({
          query: GET_TODOS,
          data: { todos: updatedTodos },
        });
      },
    });
  };

  return (
    <div
      className="flex items-center justify-between p-4 border-b border-gray-200 hover:transition hover:duration-300 hover:bg-gray-100 rounded"
      key={todo.id}
    >
      <div className="flex items-center">
        <input
          type="checkbox"
          checked={todo.completed}
          onChange={() => toggleCompleted(todo)}
          className="mr-4"
        />
        <p
          className={`font-semibold ${
            todo.completed ? "line-through text-gray-400" : ""
          }`}
        >
          {todo.task}
        </p>
      </div>
      <button
        className="px-4 py-2 text-sm font-semibold text-white bg-red-500 rounded hover:bg-red-600"
        type="submit"
        onClick={() => removeTodo(todo.id)}
      >
        Delete
      </button>
    </div>
  );
};

export default Todo;
