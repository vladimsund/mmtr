import { client } from "@/shared";

export async function createBoard(data) {
  return client.post("/board/createBoard", data);
}

export async function deleteBoard(data) {
  return client.delete(`/board/deleteBoard?boardId=${data.boardId}`);
}

export async function editBoard(data) {
  return client.put("/board/editBoard", data);
}

export async function boards() {
  return client.get("/board/boards");
}

export function reorderBoard(credentials) {
  return client.post("/board/reorderBoard", credentials);
}
