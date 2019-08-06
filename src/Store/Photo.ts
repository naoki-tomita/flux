import { useState } from "react";
import { googlePhotosAlbums } from "../API";

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

export type PhotoStore = PhotoState & PhotoActions;

export function usePhoto(initialState: PhotoState = { albums: [] }): PhotoStore {
  const [state, setState] = useState<PhotoState>(initialState);

  async function update(accessToken: string) {
    const { albums } = await googlePhotosAlbums(accessToken);
    setState({
      ...state,
      albums: albums.map(
        ({
          id,
          title,
          productUrl,
          mediaItemsCount,
          coverPhotoBaseUrl,
        }) => ({
          id,
          title,
          url: productUrl,
          size: parseInt(mediaItemsCount, 10),
          coverUrl: coverPhotoBaseUrl
        })
      )
    });
  }

  const { albums } = state;
  return { update, albums };
}
