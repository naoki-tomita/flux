import React, { createContext, useState, FunctionComponent, useContext as useContextOriginal } from "react";
import { fetchTodos, createTodo, removeTodo, updateTodo } from "./API";

export type AppType = "counter" | "todo";
const {
  counter = { count: 0 },
  todo = { todos: [], userId: Math.random().toString() },
  app = { state: "counter" }
} = JSON.parse(localStorage.getItem("state") || "{}")

interface AppState {
  state: AppType;
}

interface AppActions {
  switchApp(type: AppType): void;
}

type AppStore = AppState & AppActions;

function useApp() {
  const [state, setState] = useState<AppState>(app);
  function switchApp(type: AppType) {
    setState({ ...state, state: type });
  }

  return {
    state: state.state,
    switchApp,
  };
}

interface CounterState {
  count: number;
}

interface CounterActions {
  increment(): void;
  decrement(): void;
}

type CounterStore = CounterState & CounterActions;

function useCounter() {
  const [state, setCount] = useState<CounterState>(counter);
  return {
    count: state.count,
    increment: () => setCount({ ...state, count: state.count + 1 }),
    decrement: () => setCount({ ...state, count: state.count - 1 }),
  };
}

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

type TodoStore = TodoState & TodoActions;
function useTodo(): TodoStore {
  const [state, setState] = useState<TodoState>(todo);

  async function remove(id: TodoId) {
    const { todos } = state;
    setState({ ...state, todos: todos.filter(it => it.id !== id) })
    await removeTodo(id);
    update();
  }

  async function change({ id, title, description, done }: Todo) {
    const { todos } = state;
    setState({ ...state, todos: todos.map(it => it.id === id ? { ...it, id, title, description, done }: it) })
    await updateTodo(id, { title, description, done: done ? "TRUE" : "FALSE" });
    update();
  }

  async function update() {
    const { userId } = state;
    const rawTodos = await fetchTodos(userId);
    setState({
      ...state,
      todos: rawTodos
        .map(({ title, description, done, rowIndex }) => ({
          id: rowIndex,
          title, description,
          done: done === "TRUE"
        })),
    });
  }

  async function send(todo: IdOmittedTodo) {
    const { userId, todos } = state;
    setState({ ...state, todos: [...todos, { ...todo, id: 9999 }] })
    await createTodo({ ...todo, userId });
    update();
  }

  return {
    userId: state.userId,
    todos: state.todos,
    remove, change,
    update,
    send,
  };
}


interface Store {
  app: AppStore;
  counter: CounterStore,
  todo: TodoStore,
}

export const Context = createContext<Store>({} as any);

export const StoreProvider: FunctionComponent = ({ children }) => {
  const counter = useCounter();
  const app = useApp();
  const todo = useTodo();
  localStorage.setItem("state", JSON.stringify({ counter, app, todo }));
  return (
    <Context.Provider value={{ counter, app, todo }}>{children}</Context.Provider>
  );
}

export function useContext() {
  return useContextOriginal(Context);
}
