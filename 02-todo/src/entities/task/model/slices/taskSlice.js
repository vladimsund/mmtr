import { createSlice } from "@reduxjs/toolkit";

import { deleteList } from "@/entities/list/api";
import { deleteBoard } from "@/entities/board/api";

import * as taskApi from "../../api";

const initialState = { tasks: [] };

const tasksSlice = createSlice({
  name: "tasks",
  initialState,
  extraReducers(builder) {
    builder
      .addCase(taskApi.fetchTasks.fulfilled, (state, action) => {
        const newTasks = action.payload;
        newTasks.forEach((newTask) => {
          const exists = state.tasks.find((t) => t.id === newTask.id);
          if (!exists) {
            state.tasks.push(newTask);
          }
        });
      })
      .addCase(taskApi.deleteTask.fulfilled, (state, action) => {
        const id = action.payload.taskId;
        state.tasks = state.tasks.filter((task) => task.id !== id);
      })
      .addCase(taskApi.editTask.fulfilled, (state, action) => {
        const { name, taskId, isActive } = action.payload;
        const findTask = state.tasks.find((task) => task.id === taskId);
        findTask.name = name;
        findTask.isActive = isActive;
      })
      .addCase(deleteList.fulfilled, (state, action) => {
        const { listId } = action.payload;
        state.tasks = state.tasks.filter((task) => task.listId !== listId);
      })
      .addCase(deleteBoard.fulfilled, (state) => {
        state.tasks = [];
      });
  },
});

export default tasksSlice.reducer;
