interface TodoResponse {
  rowIndex: number;
  title: string;
  description: string;
  done: "TRUE" | "FALSE";
}

export async function fetchTodos(id: string): Promise<TodoResponse[]> {
  const response = await fetch("https://api.sheetson.com/v1/sheets/users",
    { headers: { "X-Sheetson-Spreadsheet-Id": "14ztLsgZYmLPEOk7n4HL_C8kXJRqvKJlnq8KRNzG0C48" } });
  if (response.ok) {
    return (await response.json()).results.filter((it: any) => it.removed === "FALSE" && it.userId === id);
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
      "X-Sheetson-Spreadsheet-Id": "14ztLsgZYmLPEOk7n4HL_C8kXJRqvKJlnq8KRNzG0C48",
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
      "X-Sheetson-Spreadsheet-Id": "14ztLsgZYmLPEOk7n4HL_C8kXJRqvKJlnq8KRNzG0C48",
    },
    body: JSON.stringify({ ...todo }),
  });
}
