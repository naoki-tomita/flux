import React, { FunctionComponent, useEffect } from "react";
import InfiniteScroller from "react-infinite-scroller";
import { useContext } from "../Store";
import { OAuth } from "../Google";
import { AlbumThumbnail } from "./AlbumThumbnail";
import { Box, Grid, CircularProgress } from "@material-ui/core";
import { FillGrid } from "../Components/FillGrid";

export const Photo: FunctionComponent = () => {
  const {
    google: { authorized, accessToken },
    photo: { albums, first, hasNext, next }
  } = useContext();

  useEffect(() => {
    authorized && first(accessToken!);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!authorized) {
    return <OAuth />;
  }

  return (
    <Box marginTop="24px" marginBottom="24px">
      <InfiniteScroller
        pageStart={0}
        hasMore={hasNext}
        loadMore={() => next(accessToken!)}
        loader={
          <Box key={0} marginTop="12px" display="flex" justifyContent="center">
            <CircularProgress />
          </Box>
        }
      >
        <FillGrid
          items={albums}
          render={({ id, title, coverUrl, url }) => (
            <Grid key={id} item xs>
              <AlbumThumbnail title={title} coverUrl={coverUrl} url={url} />
            </Grid>
          )}
        />
      </InfiniteScroller>
    </Box>
  );
};
