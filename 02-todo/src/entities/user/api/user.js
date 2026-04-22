import { client } from "@/shared";

export async function register(data) {
  const response = await client.post("/auth/registration", data);
  return response.data;
}

export async function login(data) {
  const response = await client.post("/auth/login", data);
  return response.data;
}
