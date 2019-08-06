import { useState } from "react";
import { googleAuthorizeRequest } from "../API";
import { Query } from "../Utils";

interface GoogleInternalState {
  accessToken?: string;
  accessTokenExpiresIn: number;
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

export type GoogleStore = GoogleState & GoogleActions;

export function useGoogle(initialState: GoogleInternalState = { accessTokenExpiresIn: 0 }): GoogleStore {
  const [state, setState] = useState<GoogleInternalState>(initialState);

  function requestAuthorization() {
    googleAuthorizeRequest();
  }

  function saveAccessToken() {
    const {
      error,
      access_token: accessToken,
      expires_in: expiresIn
    } = Query.parse(window.location.hash.substr(1));
    if (error) {
      return;
    }
    setState({
      ...state,
      accessToken,
      accessTokenExpiresIn: Date.now() + parseInt(expiresIn, 10) * 1000
    });
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
    saveAccessToken
  };
}
