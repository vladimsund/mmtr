import { client } from "@/shared";
import { selectToken, logout } from "@/entities/user";

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

export function activateTokenChecker() {
  client.interceptors.response.use(
    (response) => {
      return response;
    },
    (error) => {
      if (error.response?.status === 401) {
        store.dispatch(logout());
      }

      return Promise.reject(error);
    },
  );
}
