import React, { createContext, useState, FunctionComponent, useContext as useContextOriginal } from "react";

export type AppType = "counter" | "todo";
const {
  counter = { count: 0 },
  todo = { todos: [] },
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
}

interface TodoActions {
  add(todo: Todo): void;
  remove(id: number): void;
  change(todo: Todo): void;
}

type IdOmittedTodo = Omit<Todo, "id">;

function useTodo() {
  const [state, setState] = useState<TodoState>(todo);
  function add(todo: IdOmittedTodo) {
    const { todos } = state;
    const id = todos.length === 0 ? 0 : todos[todos.length - 1].id + 1;
    setState({ ...state, todos: [...todos, { ...todo, id: id }] });
  }

  function remove(id: TodoId) {
    const { todos } = state;
    setState({ ...state, todos: todos.filter(todo => todo.id !== id) })
  }

  function change(todo: Todo) {
    const { todos } = state;
    setState({ ...state, todos: todos.map(t => t.id === todo.id ? todo: t) });
  }

  return {
    todos: state.todos,
    add, remove, change,
  };
}

type TodoStore = TodoState & TodoActions;

type Store = AppStore & CounterStore & TodoStore;

export const Context = createContext<Store>({} as any);

export const StoreProvider: FunctionComponent = ({ children }) => {
  const counter = useCounter();
  const app = useApp();
  const todo = useTodo();
  localStorage.setItem("state", JSON.stringify({ counter, app, todo }));
  return (
    <Context.Provider value={{ ...counter, ...app, ...todo }}>{children}</Context.Provider>
  );
}

export function useContext() {
  return useContextOriginal(Context);
}
