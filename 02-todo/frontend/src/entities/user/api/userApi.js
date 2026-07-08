import { createAsyncThunk } from "@reduxjs/toolkit";

import { client } from "@/shared";

export const register = createAsyncThunk(
  "user/register",
  async (data, { rejectWithValue }) => {
    try {
      const response = await client.post("/auth/registration", data);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  },
);

export const login = createAsyncThunk(
  "user/login",
  async (data, { rejectWithValue }) => {
    try {
      const response = await client.post("/auth/login", data);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  },
);
