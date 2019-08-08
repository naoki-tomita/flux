import { useState } from "react";
import { googlePhotosAlbums, GoogleAlbum } from "../API";

interface PhotoAlbum {
  id: string;
  title: string;
  url: string;
  size: number;
  coverUrl: string;
}

interface InnerState {
  albums: PhotoAlbum[];
  nextPageToken?: string;
}

interface PhotoState {
  albums: PhotoAlbum[];
  hasNext: boolean;
}

interface PhotoActions {
  first(accessToken: string): void;
  next(accessToken: string): void;
}

export type PhotoStore = PhotoState & PhotoActions;

export function usePhoto(
  initialState: InnerState = { albums: [], nextPageToken: undefined }
): PhotoStore {
  const [state, setState] = useState<InnerState>(initialState);

  function convert({
    id,
    title,
    productUrl,
    mediaItemsCount,
    coverPhotoBaseUrl
  }: GoogleAlbum): PhotoAlbum {
    return {
      id,
      title,
      url: productUrl,
      size: parseInt(mediaItemsCount, 10),
      coverUrl: coverPhotoBaseUrl
    };
  }

  async function first(accessToken: string) {
    const { albums, nextPageToken } = await googlePhotosAlbums(accessToken);
    setState({
      ...state,
      albums: albums.map(convert),
      nextPageToken
    });
  }

  async function next(accessToken: string) {
    const { albums, nextPageToken } = await googlePhotosAlbums(
      accessToken,
      state.nextPageToken
    );
    setState({
      ...state,
      albums: [...state.albums, ...albums.map(convert)],
      nextPageToken
    });
  }

  const { albums, nextPageToken } = state;
  return { first, albums, hasNext: !!nextPageToken, next };
}
