import { Query } from "./Utils";

interface TodoResponse {
  rowIndex: number;
  title: string;
  description: string;
  done: "TRUE" | "FALSE";
}

export async function fetchTodos(id: string): Promise<TodoResponse[]> {
  const response = await fetch("https://api.sheetson.com/v1/sheets/users", {
    headers: {
      "X-Sheetson-Spreadsheet-Id":
        "14ztLsgZYmLPEOk7n4HL_C8kXJRqvKJlnq8KRNzG0C48"
    }
  });
  if (response.ok) {
    return (await response.json()).results.filter(
      (it: any) => it.removed === "FALSE" && it.userId === id
    );
  }
  return [];
}

interface TodoRequest {
  userId: string;
  title: string;
  description: string;
  done: boolean;
}

export async function createTodo(todo: TodoRequest) {
  await fetch("https://api.sheetson.com/v1/sheets/users", {
    method: "POST",
    headers: {
      "content-type": "application/json",
      "X-Sheetson-Spreadsheet-Id":
        "14ztLsgZYmLPEOk7n4HL_C8kXJRqvKJlnq8KRNzG0C48"
    },
    body: JSON.stringify({ ...todo, done: "FALSE", removed: "FALSE" })
  });
}

export async function removeTodo(id: number) {
  await updateTodo(id, { removed: "TRUE" });
}

interface TodoUpdateRequest {
  title?: string;
  description?: string;
  done?: "TRUE" | "FALSE";
  removed?: "TRUE" | "FALSE";
}

export async function updateTodo(id: number, todo: TodoUpdateRequest) {
  await fetch(`https://api.sheetson.com/v1/sheets/users/${id}`, {
    method: "PUT",
    headers: {
      "content-type": "application/json",
      "X-Sheetson-Spreadsheet-Id":
        "14ztLsgZYmLPEOk7n4HL_C8kXJRqvKJlnq8KRNzG0C48"
    },
    body: JSON.stringify({ ...todo })
  });
}

const SCOPE_GOOGLE_PHOTOS_READONLY =
  "https://www.googleapis.com/auth/photoslibrary.readonly";
const CLIENT_ID =
  "424392130787-4i90dpjls8vmbrdm1dv53p5r1r0vvco9.apps.googleusercontent.com";

export async function googleAuthorizeRequest() {
  window.location.href = `https://accounts.google.com/o/oauth2/v2/auth?${Query.stringify(
    {
      response_type: "token",
      scope: encodeURIComponent(SCOPE_GOOGLE_PHOTOS_READONLY),
      client_id: CLIENT_ID,
      redirect_uri: encodeURIComponent(window.location.origin)
    }
  )}`;
}

interface GoogleAlbam {
  id: string;
  title: string;
  productUrl: string;
  isWriteable: boolean;
  mediaItemsCount: string;
  coverPhotoBaseUrl: string;
  coverPhotoMediaItemId: string;
}

export async function googlePhotosAlbums(
  accessToken: string
): Promise<{ albums: GoogleAlbam[] }> {
  const response = await fetch(
    `https://photoslibrary.googleapis.com/v1/albums`,
    { headers: { authorization: `Bearer ${accessToken}` } }
  );
  if (response.ok) {
    return await response.json();
  }
  return { albums: [] };
}
