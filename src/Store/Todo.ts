import { useState } from "react";
import { removeTodo, updateTodo, fetchTodos, createTodo } from "../API";

type TodoId = number;
interface Todo {
  id: TodoId;
  title: string;
  description: string;
  done: boolean;
}

interface TodoState {
  todos: Todo[];
  userId: string;
}

export type IdOmittedTodo = Omit<Todo, "id">;
interface TodoActions {
  update(): void;
  send(todo: IdOmittedTodo): void;
  remove(id: number): void;
  change(todo: Todo): void;
}

export type TodoStore = TodoState & TodoActions;
export function useTodo(initialState: TodoStore): TodoStore {
  const [state, setState] = useState<TodoState>(initialState);

  async function remove(id: TodoId) {
    const { todos } = state;
    setState({ ...state, todos: todos.filter(it => it.id !== id) });
    await removeTodo(id);
    update();
  }

  async function change({ id, title, description, done }: Todo) {
    const { todos } = state;
    setState({
      ...state,
      todos: todos.map(it =>
        it.id === id ? { ...it, id, title, description, done } : it
      )
    });
    await updateTodo(id, { title, description, done: done ? "TRUE" : "FALSE" });
    update();
  }

  async function update() {
    const { userId } = state;
    const rawTodos = await fetchTodos(userId);
    setState({
      ...state,
      todos: rawTodos.map(({ title, description, done, rowIndex }) => ({
        id: rowIndex,
        title,
        description,
        done: done === "TRUE"
      }))
    });
  }

  async function send(todo: IdOmittedTodo) {
    const { userId, todos } = state;
    setState({ ...state, todos: [...todos, { ...todo, id: 9999 }] });
    await createTodo({ ...todo, userId });
    update();
  }

  return {
    userId: state.userId,
    todos: state.todos,
    remove,
    change,
    update,
    send
  };
}
