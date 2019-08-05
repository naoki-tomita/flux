import React, { FunctionComponent, useEffect } from "react";
import { useContext } from "../Store";
import { OAuth } from "../Google";
import { AlbumThumbnail } from "./AlbumThumbnail";
import { Box } from "@material-ui/core";

export const Photo: FunctionComponent = () => {
  const { google: { authorized, accessToken }, photo: { albums, update } } = useContext();

  useEffect(() => {
    authorized && update(accessToken!);
  }, [authorized]);

  if (!authorized) {
    return <OAuth />
  }

  return (
    <>
    <Box marginTop="24px" display="flex" flexWrap="wrap" justifyContent="space-between" alignContent="start">
    {albums.map(({ id, title, coverUrl, url }) =>
      <Box key={id} marginBottom="12px">
        <AlbumThumbnail title={title} coverUrl={coverUrl} url={url} />
      </Box>
    )}
    </Box>
    </>
  );
}
