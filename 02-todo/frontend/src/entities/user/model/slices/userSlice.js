import { createSlice } from "@reduxjs/toolkit";

import * as authApi from "../../api";

const KEY_TOKEN = "token";
const KEY_NAME = "name";

const initialState = {
  token: getToken(),
  name: getName(),
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    refreshAuth: (state) => {
      const token = getToken();
      const name = getName();
      saveTokenName(state, token, name);
    },
    logout: (state) => {
      saveTokenName(state, null, null);
    },
  },
  extraReducers(builder) {
    builder
      .addCase(authApi.register.fulfilled, handleSaveUserState)
      .addCase(authApi.login.fulfilled, handleSaveUserState);
  },
});

function getToken() {
  const token = localStorage.getItem(KEY_TOKEN);
  return token;
}

function getName() {
  const name = localStorage.getItem(KEY_NAME);
  return name;
}

function handleSaveUserState(state, action) {
  const { token, name } = action.payload;
  saveTokenName(state, token, name);
}

function saveTokenName(state, token, name) {
  if (token) {
    localStorage.setItem(KEY_TOKEN, token);
    localStorage.setItem(KEY_NAME, name);
  } else {
    localStorage.removeItem(KEY_TOKEN);
    localStorage.removeItem(KEY_NAME);
  }
  state.token = token;
  state.name = name;
}

export const { refreshAuth, logout } = userSlice.actions;
export default userSlice.reducer;
