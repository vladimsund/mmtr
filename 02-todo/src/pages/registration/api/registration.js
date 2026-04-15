import { client } from "@/shared";

export default function register(credentials) {
  return client.post("/auth/registration", credentials);
}
