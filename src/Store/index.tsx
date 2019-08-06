import React, {
  createContext,
  FunctionComponent,
  useContext as useContextOriginal
} from "react";
import { GoogleStore, useGoogle } from "./Google";
import { PhotoStore, usePhoto } from "./Photo";
import { AppStore, useApp } from "./App";
import { TodoStore, useTodo } from "./Todo";
import { useCounter, CounterStore } from "./Counter";

const {
  counter = { count: 0 },
  todo = { todos: [], userId: Math.random().toString() },
  app = { state: "counter" },
  google = {
    authorized: false,
    needSaveAccessToken: false,
    accessTokenExpiresIn: 0
  },
  photo = { albums: [] }
} = JSON.parse(localStorage.getItem("state") || "{}");

interface Store {
  app: AppStore;
  counter: CounterStore;
  todo: TodoStore;
  google: GoogleStore;
  photo: PhotoStore;
}

export const Context = createContext<Store>({} as any);

export const StoreProvider: FunctionComponent = ({ children }) => {
  const counterStore = useCounter(counter);
  const appStore = useApp(app);
  const todoStore = useTodo(todo);
  const googleStore = useGoogle(google);
  const photoStore = usePhoto(photo);
  localStorage.setItem(
    "state",
    JSON.stringify({
      counter: counterStore,
      app: appStore,
      todo: todoStore,
      google: googleStore,
      photo: photoStore
    })
  );
  return (
    <Context.Provider
      value={{
        counter: counterStore,
        app: appStore,
        todo: todoStore,
        google: googleStore,
        photo: photoStore
      }}
    >
      {children}
    </Context.Provider>
  );
};

export function useContext() {
  return useContextOriginal(Context);
}
