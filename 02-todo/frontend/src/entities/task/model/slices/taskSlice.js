import { createSlice } from "@reduxjs/toolkit";

import * as listApi from "@/entities/list/api";
import * as boardApi from "@/entities/board/api";

import * as taskApi from "../../api";

const initialState = { tasks: [], isLoading: false };

const tasksSlice = createSlice({
  name: "tasks",
  initialState,
  extraReducers(builder) {
    builder
      .addCase(taskApi.fetchTasks.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(taskApi.fetchTasks.fulfilled, (state, action) => {
        const newTasks = action.payload;
        newTasks.forEach((newTask) => {
          const exists = state.tasks.find((t) => t.id === newTask.id);
          if (!exists) {
            state.tasks.push(newTask);
          }
        });
        state.isLoading = false;
      })
      .addCase(taskApi.deleteTask.fulfilled, (state, action) => {
        const taskId = action.payload.taskId;
        state.tasks = state.tasks.filter((task) => task.id !== taskId);
      })
      .addCase(taskApi.editTask.fulfilled, (state, action) => {
        const { name, taskId, isActive } = action.payload;
        const findTask = state.tasks.find((task) => task.id === taskId);
        findTask.name = name;
        findTask.isActive = isActive;
      })
      .addCase(taskApi.reorderTask.fulfilled, (state, action) => {
        const { newListId, taskId, order: newOrder } = action.payload;

        const draggedTask = state.tasks.find((task) => task.id === taskId);
        const oldListId = draggedTask.listId;
        const oldOrder = draggedTask.order;

        if (oldListId === newListId) {
          if (oldOrder < newOrder) {
            for (let i = 0; i < state.tasks.length; i++) {
              const t = state.tasks[i];
              if (
                t.listId === oldListId &&
                t.order > oldOrder &&
                t.order <= newOrder
              ) {
                t.order--;
              }
            }
          } else {
            for (let i = 0; i < state.tasks.length; i++) {
              const t = state.tasks[i];
              if (
                t.listId === oldListId &&
                t.order >= newOrder &&
                t.order < oldOrder
              ) {
                t.order++;
              }
            }
          }
        } else {
          for (let i = 0; i < state.tasks.length; i++) {
            const t = state.tasks[i];
            if (t.listId === oldListId && t.order > oldOrder) {
              t.order--;
            } else if (t.listId === newListId && t.order >= newOrder) {
              t.order++;
            }
          }
        }

        draggedTask.listId = newListId;
        draggedTask.order = newOrder;
      })
      .addCase(listApi.deleteList.fulfilled, (state, action) => {
        const { listId } = action.payload;
        state.tasks = state.tasks.filter((task) => task.listId !== listId);
      })
      .addCase(boardApi.fetchBoards.fulfilled, (state) => {
        state.tasks = [];
      });
  },
});

export default tasksSlice.reducer;
