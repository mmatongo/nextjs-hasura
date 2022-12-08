import React from "react";
import { useQuery } from "@apollo/client";
import { GET_TODOS } from "../../graphql/mutations";
import Todo from "../todo";

const Todos = () => {
  const { data, loading, error } = useQuery(GET_TODOS);
  if (loading) {
    return (
      <div className="flex items-center justify-center w-full h-full p-4">
        <div className="flex items-center space-x-2 animate-pulse">
          <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
          <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
          <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center w-full h-full">
        <p className="text-red-500">Error: {error.message}</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center w-full h-full">
      <div className="w-full max-w-md">
        <div className="flex items-center justify-between p-4 border-b border-gray-200">
          <h1 className="text-2xl font-bold">Todos</h1>
        </div>
        {data.todos.map((todo: any) => (
          <Todo key={todo.id} todo={todo} />
        ))}
      </div>
    </div>
  );
};

export default Todos;
