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
import { SettingStore, useSetting } from "./Setting";

const { counter, todo, app, google, photo, setting } = JSON.parse(
  localStorage.getItem("state") || "{}"
);

interface Store {
  app: AppStore;
  counter: CounterStore;
  todo: TodoStore;
  google: GoogleStore;
  photo: PhotoStore;
  setting: SettingStore;
}

export const Context = createContext<Store>({} as any);

export const StoreProvider: FunctionComponent = ({ children }) => {
  const counterStore = useCounter(counter);
  const appStore = useApp(app);
  const todoStore = useTodo(todo);
  const googleStore = useGoogle(google);
  const photoStore = usePhoto(photo);
  const settingStore = useSetting(setting);
  localStorage.setItem(
    "state",
    JSON.stringify({
      counter: counterStore,
      app: appStore,
      todo: todoStore,
      google: googleStore,
      photo: photoStore,
      setting: settingStore
    })
  );
  return (
    <Context.Provider
      value={{
        counter: counterStore,
        app: appStore,
        todo: todoStore,
        google: googleStore,
        photo: photoStore,
        setting: settingStore
      }}
    >
      {children}
    </Context.Provider>
  );
};

export function useContext() {
  return useContextOriginal(Context);
}
