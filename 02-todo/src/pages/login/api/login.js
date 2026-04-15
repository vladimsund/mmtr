import { client } from "@/shared";

export default function login(credentials) {
  return client.post("/auth/login", credentials);
}
