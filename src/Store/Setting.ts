interface SettingState {

}

interface SettingActions {
  reset(): void;
}

export type SettingStore = SettingState & SettingActions;

export function useSetting(initialState: SettingState): SettingStore {
  function reset() {
    localStorage.clear();
    window.location.reload();
  }

  return {
    reset,
  };
}
