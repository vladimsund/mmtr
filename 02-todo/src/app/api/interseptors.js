import { client } from "@/shared";
import { selectToken } from "@/entities/user";

import store from "../store/store";

export function activateTokenHeader() {
  client.interceptors.request.use((config) => {
    const state = store.getState();
    const token = selectToken(state);

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  });
}
