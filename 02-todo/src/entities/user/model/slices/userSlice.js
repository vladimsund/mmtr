import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import * as authApi from "../../api/user";

const KEY_TOKEN = "token";
const KEY_NAME = "name";

const initialState = {
  token: getToken(),
  name: getName(),
};

export const register = createAsyncThunk(
  "user/register",
  async (data, { rejectWithValue }) => {
    try {
      const response = await authApi.register(data);
      return response;
    } catch (err) {
      return rejectWithValue(err.response?.data);
    }
  },
);

export const login = createAsyncThunk(
  "user/login",
  async (data, { rejectWithValue }) => {
    try {
      const response = await authApi.login(data);
      return response;
    } catch (err) {
      return rejectWithValue(err.response?.data);
    }
  },
);

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    refreshAuth: (state) => {
      const token = getToken();
      const name = getName();
      saveTokenName(state, token, name);
    },
  },
  extraReducers(builder) {
    builder
      .addCase(register.fulfilled, handleSaveUserState)
      .addCase(login.fulfilled, handleSaveUserState);
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

export const { refreshAuth } = userSlice.actions;
export default userSlice.reducer;
