import React, { FunctionComponent, useEffect } from "react";
import { useContext } from "../Store";

export const OAuth: FunctionComponent = () => {
  const {
    google: { needSaveAccessToken, requestAuthorization, saveAccessToken }
  } = useContext();
  useEffect(() => {
    !needSaveAccessToken ? requestAuthorization() : saveAccessToken();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return <></>;
};
