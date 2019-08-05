import React, { createContext, useState, FunctionComponent, useContext as useContextOriginal } from "react";
import { fetchTodos, createTodo, removeTodo, updateTodo, googleAuthorizeRequest, googlePhotosAlbums } from "./API";
import { Query } from "./Utils";

export type AppType = "counter" | "todo" | "photo";
const {
  counter = { count: 0 },
  todo = { todos: [], userId: Math.random().toString() },
  app = { state: "counter" },
  google = { authorized: false, needSaveAccessToken: false, accessTokenExpiresIn: 0 },
  photo = { albums: [] },
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

interface GoogleState {
  accessToken?: string;
  accessTokenExpiresIn: number;
  authorized: boolean;
  needSaveAccessToken: boolean;
}

interface GoogleActions {
  requestAuthorization(): void;
  saveAccessToken(): void;
}

type GoogleStore = GoogleState & GoogleActions;

function useGoogle(): GoogleStore {
  const [state, setState] = useState<Omit<Omit<GoogleState, "authorized">, "needSaveAccessToken">>(google);

  function requestAuthorization() {
    googleAuthorizeRequest();
  }

  function saveAccessToken() {
    const { error, access_token: accessToken, expires_in: expiresIn } = Query.parse(window.location.hash.substr(1));
    if (error) {
      return;
    }
    setState({ ...state, accessToken, accessTokenExpiresIn: Date.now() + (parseInt(expiresIn, 10) * 1000)});
    window.location.hash = "";
  }

  const { accessToken, accessTokenExpiresIn } = state;
  const token = accessTokenExpiresIn > Date.now() ? accessToken : undefined;
  return {
    accessToken: token,
    accessTokenExpiresIn,
    authorized: !!token,
    needSaveAccessToken: !!window.location.hash,
    requestAuthorization,
    saveAccessToken,
  };
}

interface PhotoAlbum {
  id: string;
  title: string;
  url: string;
  size: number;
  coverUrl: string;
}

interface PhotoState {
  albums: PhotoAlbum[];
}

interface PhotoActions {
  update(accessToken: string): void;
}

type PhotoStore = PhotoState & PhotoActions;

function usePhoto(): PhotoStore {
  const [state, setState] = useState<PhotoState>(photo);

  async function update(accessToken: string) {
    const { albums } = await googlePhotosAlbums(accessToken);
    setState({
      ...state,
      albums: albums
        .map(({ id, title, productUrl, mediaItemsCount, coverPhotoBaseUrl, coverPhotoMediaItemId }) =>
          ({ id, title, url: productUrl, size: parseInt(mediaItemsCount, 10), coverUrl: coverPhotoBaseUrl })),
    });
  }

  const { albums } = state;
  return { update, albums };
}

interface Store {
  app: AppStore;
  counter: CounterStore;
  todo: TodoStore;
  google: GoogleStore;
  photo: PhotoStore;
}

export const Context = createContext<Store>({} as any);

export const StoreProvider: FunctionComponent = ({ children }) => {
  const counter = useCounter();
  const app = useApp();
  const todo = useTodo();
  const google = useGoogle();
  const photo = usePhoto();
  localStorage.setItem("state", JSON.stringify({ counter, app, todo, google, photo }));
  return (
    <Context.Provider value={{ counter, app, todo, google, photo }}>{children}</Context.Provider>
  );
}

export function useContext() {
  return useContextOriginal(Context);
}
