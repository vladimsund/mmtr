import { client } from "@/shared";

export async function createTask(data) {
  return client.post("/task/createTask", data);
}

export async function deleteTask(data) {
  return client.delete(
    `/task/deleteTask?taskId=${data.taskId}&listId=${data.listId}&boardId=${data.boardId}`,
  );
}

export async function editTask(data) {
  return client.put("/task/editTask", data);
}

export async function tasks(data) {
  return client.get(`/task/task?boardId=${data.boardId}&listId=${data.listId}`);
}

export function reorderTask(data) {
  return client.post("/task/reorderTask", data);
}
