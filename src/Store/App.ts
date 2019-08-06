import { useState } from "react";

export type AppType = "counter" | "todo" | "photo";
interface AppState {
  state: AppType;
}

interface AppActions {
  switchApp(type: AppType): void;
}

export type AppStore = AppState & AppActions;

export function useApp(initialState: AppState) {
  const [state, setState] = useState<AppState>(initialState);
  function switchApp(type: AppType) {
    setState({ ...state, state: type });
  }

  return {
    state: state.state,
    switchApp
  };
}
