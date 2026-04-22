import { client } from "@/shared";

export async function createList(data) {
  return client.post("/list/createList", data);
}

export async function deleteList(data) {
  return client.delete(
    `/list/deleteList?listId=${data.listId}&boardId=${data.boardId}`,
  );
}

export async function editList(data) {
  return client.put("/list/editList", data);
}

export async function lists(data) {
  return client.get(`/list/list?boardId=${data.boardId}`);
}

export function reorderList(data) {
  return client.post("/list/reorderBoard", data);
}
