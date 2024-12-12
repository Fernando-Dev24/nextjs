"use client";

import { useOptimistic, useTransition } from "react";
import { Todo } from "@prisma/client";
import styles from "./TodoItem.module.css";
import { IoCheckboxOutline, IoSquareOutline } from "react-icons/io5";

interface Props {
  todo: Todo;
  toggleTodo: (id: string, complete: boolean) => Promise<Todo | void>;
}

export const TodoItem = ({ todo, toggleTodo }: Props) => {
  const [todoOptimistic, toggleTodoOptimistic] = useOptimistic(
    todo,
    (state, newCompleteValue: boolean) => ({
      ...state,
      complete: newCompleteValue,
    })
  );
  const [isPending, startTransition] = useTransition();

  const onToggleTodo = async () => {
    startTransition(async () => {
      try {
        toggleTodoOptimistic(!todoOptimistic.complete);
        await toggleTodo(todoOptimistic.id, !todoOptimistic.complete);
      } catch {
        toggleTodoOptimistic(todoOptimistic.complete);
      }
    });
  };

  return (
    <div
      className={todoOptimistic.complete ? styles.todoDone : styles.todoPending}
    >
      <div className="flex flex-col sm:flex-row justify-start items-center gap-4">
        <div
          onClick={onToggleTodo}
          className={`
            flex p-2 rounded-md cursor-pointer
            hover:bg-opacity-60
            ${todo.complete ? "bg-blue-100" : "bg-red-100"}
         `}
        >
          {todoOptimistic.complete ? (
            <IoCheckboxOutline size={30} />
          ) : (
            <IoSquareOutline size={30} />
          )}
        </div>

        <div className="text-center sm:text-left">
          {isPending ? "Actualizando..." : todoOptimistic.description}
        </div>
      </div>
    </div>
  );
};
